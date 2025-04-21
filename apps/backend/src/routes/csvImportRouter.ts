import { initTRPC, TRPCError } from '@trpc/server';
import PrismaClient from '../bin/prisma-client';
import { z } from 'zod';
import { parse } from 'csv-parse/sync';

export const t = initTRPC.create();

// Trim the nodeCoord String
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
                            name: buildingName,
                            address: record['Building Address'] || '',
                            phoneNumber: record['Building Phone Number'] || '',
                        },
                    });

                    // Get the node info
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

                    // Find or create node
                    let node = await PrismaClient.node.findFirst({
                        where: { lat, long },
                    });

                    if (!node) {
                        node = await PrismaClient.node.create({
                            data: {
                                type: 'Location',
                                lat,
                                long,
                                description,
                            },
                        });
                    }

                    // Store node ID for edge creation
                    nodeMap.set(rawCoord, node.id);

                    // Create or update department
                    let department = await PrismaClient.department.findFirst({
                        where: {
                            name: departmentName,
                            Location: {
                                some: {
                                    buildingId: building.id,
                                },
                            },
                        },
                    });

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

                    // Create or update location
                    await PrismaClient.location.upsert({
                        where: {
                            id: node.id, // Using node ID as location ID
                        },
                        update: {
                            floor,
                            suite,
                            buildingId: building.id,
                            departmentId: department.id,
                            nodeID: node.id,
                        },
                        create: {
                            id: node.id,
                            floor,
                            suite,
                            buildingId: building.id,
                            departmentId: department.id,
                            nodeID: node.id,
                        },
                    });

                    // Handle services
                    const svcNames = (record['Services'] || '')
                        .split(';')
                        .map((s: string) => s.trim());

                    for (const name of svcNames) {
                        if (!name) continue;

                        let service = await PrismaClient.service.findFirst({ where: { name } });

                        if (!service) {
                            service = await PrismaClient.service.create({ data: { name } });
                        }

                        const exists = await PrismaClient.departmentServices.findFirst({
                            where: {
                                departmentID: department.id,
                                serviceID: service.id,
                            },
                        });

                        if (!exists) {
                            await PrismaClient.departmentServices.create({
                                data: {
                                    departmentID: department.id,
                                    serviceID: service.id,
                                },
                            });
                        }
                    }

                    // Store edges for later creation
                    const edgeStrs = (record['Edge Connections (from -> to)'] || '')
                        .split(';')
                        .map((s: string) => s.trim());

                    for (const edgeStr of edgeStrs) {
                        const match = edgeStr.match(
                            /\(([-\d.]+),\s*([-\d.]+)\)\s*->\s*\(([-\d.]+),\s*([-\d.]+)\)/
                        );
                        if (!match) continue;

                        const from = normalizeCoord(`(${match[1]},${match[2]})`);
                        const to = normalizeCoord(`(${match[3]},${match[4]})`);

                        edgeBuffer.push({ from, to });
                    }
                }

                // Create edges
                for (const { from, to } of edgeBuffer) {
                    const fromId = nodeMap.get(from);
                    const toId = nodeMap.get(to);

                    if (!fromId || !toId) {
                        console.warn(`Missing node`);
                        continue;
                    }

                    const exists = await PrismaClient.edge.findFirst({
                        where: { fromNodeId: fromId, toNodeId: toId },
                    });

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
