import { initTRPC, TRPCError } from '@trpc/server';
import PrismaClient from '../bin/prisma-client';
import { z } from 'zod';
import { parse } from 'csv-parse/sync';

export const t = initTRPC.create();

//trim the nodeCoord String
const normalizeCoord = (coord: string) => coord.replace(/\s+/g, '');

export const csvImportRouter = t.router({
    importCSV: t.procedure
        .input(z.union([z.string(), z.object({ json: z.string() })]))
        .mutation(async (req) => {
            try {
                const input = typeof req.input === 'string' ? req.input : req.input.json;

                const records = parse(input, {
                    columns: true,
                    skip_empty_lines: true,
                    trim: true,
                });

                const edgeBuffer: { from: string; to: string }[] = [];
                const nodeMap = new Map<string, number>(); // nodeCoord -> nodeId

                for (const record of records) {
                    const departmentName = record['Department Name']?.trim();
                    const buildingName = record['Building Name']?.trim();
                    if (!buildingName) {
                        throw new TRPCError({
                            code: 'BAD_REQUEST',
                            message: `Building Name missing`,
                        });
                    }

                    // Create/Update the building via building name
                    const building = await PrismaClient.building.upsert({
                        where: { name: buildingName },
                        update: {
                            address: record['Building Address'] || '',
                            phoneNumber: record['Building Phone Number'] || '',
                        },
                        create: {
                            id : 1,
                            name: buildingName,
                            address: record['Building Address'] || '',
                            phoneNumber: record['Building Phone Number'] || '',
                        },
                    });

                    // get the node info
                    const rawCoord = normalizeCoord(record['Node (lat,long)']);
                    if (!rawCoord) {
                        throw new TRPCError({
                            code: 'BAD_REQUEST',
                            message: `Node Coord missing`,
                        });
                    }
                    const match = rawCoord.match(/\(([-\d.]+),\s*([-\d.]+)\)/); // match to (decimal,decimal)
                    if (!match) {
                        throw new TRPCError({
                            code: 'BAD_REQUEST',
                            message: `Invalid format of the Node Coord`,
                        });
                    }

                    const lat = parseFloat(match[1]); // get the lat
                    const long = parseFloat(match[2]); // get the long
                    const floor = parseInt(record['Floor'].trim(), 10);
                    if (isNaN(floor)) {
                        throw new TRPCError({
                            code: 'BAD_REQUEST',
                            message: `Floor number missing`,
                        });
                    }
                    const description = (record['Node Description'] || '').trim();
                    const suite = (record['Suite'] || '').trim();

                    //find with there is the same lat, long, and floor
                    let node = await PrismaClient.node.findFirst({
                        where: { lat, long, floor },
                    });

                    // if node doesn't exist that create the node
                    if (!node) {
                        node = await PrismaClient.node.create({
                            data: {
                                type: 'Location',
                                lat,
                                long,
                                floor,
                                suite,
                                description,
                                buildingId: building.id,
                                departmentId: null, // added later
                            },
                        });
                    }
                    //make sure the node and the building is connected
                    await PrismaClient.node.update({
                        where: { id: node.id },
                        data: { buildingId: building.id },
                    });
                    // key the nodeCoord with the nodeId
                    nodeMap.set(rawCoord, node.id);

                    // create or update department
                    //find department via department name and building id
                    let department = await PrismaClient.department.findFirst({
                        where: {
                            name: departmentName,
                            node: {
                                some: {
                                    buildingId: building.id,
                                },
                            },
                        },
                    });

                    //if department doesn't exist create department or update info
                    if (!department) {
                        department = await PrismaClient.department.create({
                            data: {
                                name: departmentName,
                                phoneNumber: record['Phone Number'] || '',
                                description: record['Department Description'] || null,
                            },
                        });
                    } else {
                        department = await PrismaClient.department.update({
                            where: { id: department.id },
                            data: {
                                phoneNumber: record['Phone Number'] || '',
                                description: record['Department Description'] || null,
                            },
                        });
                    }

                    // update node with departmentId
                    await PrismaClient.node.update({
                        where: { id: node.id },
                        data: { departmentId: department.id },
                    });

                    // get all the service
                    const svcNames = (record['Services'] || '')
                        .split(';')
                        .map((s: string) => s.trim());

                    //for every service
                    for (const name of svcNames) {
                        if (!name) continue;

                        //find out if there is already a service in the database
                        let service = await PrismaClient.service.findFirst({ where: { name } });

                        //if there isn't create one
                        if (!service) {
                            service = await PrismaClient.service.create({ data: { name } });
                        }

                        //check if there is a relationship between the department and service
                        const exists = await PrismaClient.departmentServices.findFirst({
                            where: {
                                departmentID: department.id,
                                serviceID: service.id,
                            },
                        });

                        // if there isn't, create it
                        if (!exists) {
                            await PrismaClient.departmentServices.create({
                                data: {
                                    departmentID: department.id,
                                    serviceID: service.id,
                                },
                            });
                        }
                    }

                    // store all the edges
                    //separate to different edge connection
                    const edgeStrs = (record['Edge Connections (from -> to)'] || '')
                        .split(';')
                        .map((s: string) => s.trim());

                    for (const edgeStr of edgeStrs) {
                        const match = edgeStr.match(
                            /\(([-\d.]+),\s*([-\d.]+)\)\s*->\s*\(([-\d.]+),\s*([-\d.]+)\)/
                        ); // match to (lat, long) -> (lat, long)
                        if (!match) continue;

                        const from = normalizeCoord(`(${match[1]},${match[2]})`);
                        const to = normalizeCoord(`(${match[3]},${match[4]})`);

                        //store the edges
                        edgeBuffer.push({ from, to });
                    }
                }

                // create the edges from the store
                for (const { from, to } of edgeBuffer) {
                    const fromId = nodeMap.get(from);
                    const toId = nodeMap.get(to);

                    if (!fromId || !toId) {
                        console.warn(`Missing node`);
                        continue;
                    }

                    //find if the edge exist
                    const exists = await PrismaClient.edge.findFirst({
                        where: { fromNodeId: fromId, toNodeId: toId },
                    });

                    // if not add it
                    if (!exists) {
                        await PrismaClient.edge.create({
                            data: {
                                fromNodeId: fromId,
                                toNodeId: toId,
                            },
                        });
                    }
                }

                return { message: 'CSV import succeeded (1 node per row)' };
            } catch (error) {
                const msg = error instanceof Error ? error.message : String(error);
                throw new TRPCError({
                    code: 'INTERNAL_SERVER_ERROR',
                    message: `Import error: ${msg}`,
                });
            }
        }),
});
