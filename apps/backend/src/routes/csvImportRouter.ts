import { initTRPC, TRPCError } from '@trpc/server';
import PrismaClient from '../bin/prisma-client';
import { z } from 'zod';
import { parse } from 'csv-parse/sync';

export const t = initTRPC.create();

export const csvImportRouter = t.router({
    importCSV: t.procedure
        .input(z.union([z.string(), z.object({ json: z.string() })]))
        .mutation(async (req) => {
            try {
                const input = typeof req.input === 'string' ? req.input : req.input.json;
                //parse through the parse library
                const records = parse(input, {
                    columns: true,
                    skip_empty_lines: true,
                    trim: true,
                });

                const edgeBuffer: { from: string; to: string }[] = [];
                const nodeMap = new Map<string, number>(); // key: "lat,long" -> node.id

                //for each row of the csv
                for (const record of records) {
                    //get the deptID and buildingID
                    const deptId = parseInt(record['Department ID'], 10);
                    const bldgId = parseInt(record['Building ID'], 10);

                    if (isNaN(deptId) || isNaN(bldgId)) continue;

                    //update the building and department or create a new building and department
                    const building = await PrismaClient.building.upsert({
                        where: { id: bldgId },
                        update: {
                            name: record['Building Name'] || '',
                            address: record['Building Address'] || '',
                            phoneNumber: record['Building Phone Number'] || '',
                        },
                        create: {
                            id: bldgId,
                            name: record['Building Name'] || '',
                            address: record['Building Address'] || '',
                            phoneNumber: record['Building Phone Number'] || '',
                        },
                    });

                    const department = await PrismaClient.department.upsert({
                        where: { id: deptId },
                        update: {
                            name: record['Department Name'] || '',
                            phoneNumber: record['Phone Number'] || '',
                            buildingID: bldgId,
                        },
                        create: {
                            id: deptId,
                            name: record['Department Name'] || '',
                            phoneNumber: record['Phone Number'] || '',
                            buildingID: bldgId,
                        },
                    });

                    // split the service
                    const svcIds = (record['Service ID'] || '')
                        .split(';')
                        .map((id: string) => id.trim());
                    const svcNames = (record['Services'] || '')
                        .split(';')
                        .map((s: string) => s.trim());

                    //for each service
                    for (let i = 0; i < svcIds.length; i++) {
                        const svcId = parseInt(svcIds[i], 10);
                        if (isNaN(svcId)) continue;

                        const name = svcNames[i] || `Service ${svcId}`;
                        //update the service or create a service
                        const service = await PrismaClient.service.upsert({
                            where: { id: svcId },
                            update: { name },
                            create: { id: svcId, name },
                        });

                        //check if the relationship between department and service exist. if not, create the relationship
                        const exists = await PrismaClient.departmentServices.findFirst({
                            where: {
                                departmentID: deptId,
                                serviceID: svcId,
                            },
                        });

                        if (!exists) {
                            await PrismaClient.departmentServices.create({
                                data: {
                                    departmentID: deptId,
                                    serviceID: svcId,
                                },
                            });
                        }
                    }

                    // get every node info
                    const latLongPairs = (record['"Node (lat,long)"'] || '')
                        .split(';')
                        .map((s: string) => s.trim());
                    const descriptions = (record['Node Description'] || '')
                        .split(';')
                        .map((s: string) => s.trim());
                    const floors = (record['Floor'] || '')
                        .split(';')
                        .map((s: string) => parseInt(s.trim(), 10) || 1);
                    const suites = (record['Suite'] || '').split(';').map((s: string) => s.trim());

                    for (let i = 0; i < latLongPairs.length; i++) {
                        const match = latLongPairs[i].match(/\(([-\d.]+),\s*([-\d.]+)\)/);
                        if (!match) continue;

                        const lat = parseFloat(match[1]);
                        const long = parseFloat(match[2]);
                        const coordKey = `${lat},${long}`;

                        //check if the node exist
                        const existingNode = await PrismaClient.node.findFirst({
                            where: {
                                lat: lat,
                                long: long,
                                floor: floors[i],
                            },
                        });

                        //if it exists, add it to the nodeMap
                        if (existingNode) {
                            nodeMap.set(coordKey, existingNode.id);
                        } else {
                            //if it doesn't exist, create the node and add it to the nodeMap
                            const node = await PrismaClient.node.create({
                                data: {
                                    type: 'Location',
                                    lat,
                                    long,
                                    description: descriptions[i] || '',
                                    floor: floors[i] || 1,
                                    suite: suites[i] || '',
                                    buildingId: bldgId,
                                    departmentId: deptId,
                                },
                            });

                            nodeMap.set(coordKey, node.id);
                        }
                    }

                    // get edge info
                    const edgeStrs = (record['Edge Connections (from -> to)'] || '')
                        .split(';')
                        .map((s: string) => s.trim());

                    for (const edgeStr of edgeStrs) {
                        const match = edgeStr.match(
                            /\(([-\d.]+),\s*([-\d.]+)\)\s*->\s*\(([-\d.]+),\s*([-\d.]+)\)/
                        );
                        if (!match) continue;

                        const from = `${parseFloat(match[1])},${parseFloat(match[2])}`;
                        const to = `${parseFloat(match[3])},${parseFloat(match[4])}`;
                        //add to the edge pairs
                        edgeBuffer.push({ from, to });
                    }
                }

                // Create the edges
                for (const { from, to } of edgeBuffer) {
                    const fromId = nodeMap.get(from);
                    const toId = nodeMap.get(to);

                    if (!fromId || !toId) {
                        console.warn(`Node at ${from} or ${to} not found`);
                        continue;
                    }

                    // check if the edge exist
                    const exists = await PrismaClient.edge.findFirst({
                        where: { fromNodeId: fromId, toNodeId: toId },
                    });

                    // if edge doesn't exist, create a new edge
                    if (!exists) {
                        await PrismaClient.edge.create({
                            data: {
                                fromNodeId: fromId,
                                toNodeId: toId,
                            },
                        });
                    }
                }

                return { message: 'CSV import succeeded!' };
            } catch (error) {
                const msg = error instanceof Error ? error.message : String(error);
                throw new TRPCError({
                    code: 'INTERNAL_SERVER_ERROR',
                    message: `Import error: ${msg}`,
                });
            }
        }),
});
