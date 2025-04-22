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
                    // Validate required fields
                    const buildingName = record['Building Name']?.trim();
                    if (!buildingName) {
                        throw new TRPCError({
                            code: 'BAD_REQUEST',
                            message: `Building Name missing in row`,
                        });
                    }

                    const rawCoord = normalizeCoord(record['Node (lat,long)']);
                    if (!rawCoord) {
                        throw new TRPCError({
                            code: 'BAD_REQUEST',
                            message: `Node coordinates missing in row`,
                        });
                    }

                    const match = rawCoord.match(/\(([-\d.]+),\s*([-\d.]+)\)/);
                    if (!match) {
                        throw new TRPCError({
                            code: 'BAD_REQUEST',
                            message: `Invalid coordinate format: ${rawCoord}`,
                        });
                    }

                    const lat = parseFloat(match[1]);
                    const long = parseFloat(match[2]);
                    const floor = parseInt(record['Floor']?.trim() || '0', 10);
                    if (isNaN(floor)) {
                        throw new TRPCError({
                            code: 'BAD_REQUEST',
                            message: `Invalid floor number: ${record['Floor']}`,
                        });
                    }

                    // Create/Update building
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

                    // Create/Update node
                    let node = await PrismaClient.node.findFirst({
                        where: { lat, long },
                    });

                    if (!node) {
                        node = await PrismaClient.node.create({
                            data: {
                                type: record['Node Type'] || 'Location',
                                lat,
                                long,
                                description: record['Node Description'] || '',
                            },
                        });
                    }

                    // Store node ID for edge creation
                    nodeMap.set(rawCoord, node.id);

                    // Create/Update department if name exists
                    let department = null;
                    const departmentName = record['Department Name']?.trim();
                    if (departmentName) {
                        // First try to find existing department
                        const existingDept = await PrismaClient.department.findFirst({
                            where: { name: departmentName },
                        });

                        if (existingDept) {
                            // Update existing department
                            department = await PrismaClient.department.update({
                                where: { id: existingDept.id },
                                data: {
                                    phoneNumber: record['Phone Number'] || '',
                                    description: record['Department Description'] || null,
                                },
                            });
                        } else {
                            // Create new department
                            department = await PrismaClient.department.create({
                                data: {
                                    name: departmentName,
                                    phoneNumber: record['Phone Number'] || '',
                                    description: record['Department Description'] || null,
                                },
                            });
                        }
                    }

                    // Create/Update location
                    await PrismaClient.location.upsert({
                        where: {
                            id: node.id,
                        },
                        update: {
                            floor,
                            suite: record['Suite'] || '',
                            buildingId: building.id,
                            departmentId: department?.id || null,
                            nodeID: node.id,
                        },
                        create: {
                            id: node.id,
                            floor,
                            suite: record['Suite'] || '',
                            buildingId: building.id,
                            departmentId: department?.id || null,
                            nodeID: node.id,
                        },
                    });

                    // Handle services if department exists
                    if (department) {
                        const svcNames = (record['Services'] || '')
                            .split(';')
                            .map((s: string) => s.trim())
                            .filter(Boolean);

                        for (const name of svcNames) {
                            let service = await PrismaClient.service.findFirst({ where: { name } });

                            if (!service) {
                                service = await PrismaClient.service.create({ data: { name } });
                            }

                            // Check if relationship exists
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
                    }

                    // Store edges for later creation
                    const edgeStrs = (record['Edge Connections (from -> to)'] || '')
                        .split(';')
                        .map((s: string) => s.trim())
                        .filter(Boolean);

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
                        console.warn(`Missing node for edge: ${from} -> ${to}`);
                        continue;
                    }

                    // Check if edge exists
                    const exists = await PrismaClient.edge.findFirst({
                        where: {
                            fromNodeId: fromId,
                            toNodeId: toId,
                        },
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

                return { message: 'CSV import succeeded' };
            } catch (error) {
                const msg = error instanceof Error ? error.message : String(error);
                throw new TRPCError({
                    code: 'INTERNAL_SERVER_ERROR',
                    message: `Import error: ${msg}`,
                });
            }
        }),
});
