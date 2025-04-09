import { initTRPC, TRPCError } from '@trpc/server';
import PrismaClient from '../bin/prisma-client';
import { z } from 'zod';

export const t = initTRPC.create();

// Shared CSV parser
function parseCSVLine(line: string): string[] {
    const values: string[] = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
            if (inQuotes && line[i + 1] === '"') {
                current += '"';
                i++;
            } else {
                inQuotes = !inQuotes;
            }
        } else if (char === ',' && !inQuotes) {
            values.push(current);
            current = '';
        } else {
            current += char;
        }
    }

    values.push(current);
    return values.map((v) => v.trim());
}

export const csvImportRouter = t.router({
    // Database reset functionality
    clearDatabase: t.procedure.mutation(async () => {
        try {
            // Delete in proper order for foreign key constraints
            await PrismaClient.departmentServices.deleteMany({});
            await PrismaClient.location.deleteMany({});
            await PrismaClient.department.deleteMany({});
            await PrismaClient.service.deleteMany({});
            await PrismaClient.building.deleteMany({});
            return { message: 'Database cleared' };
        } catch (error) {
            const msg = error instanceof Error ? error.message : String(error);
            throw new TRPCError({
                code: 'INTERNAL_SERVER_ERROR',
                message: `Clear error: ${msg}`,
            });
        }
    }),

    // CSV Import functionality
    importCSV: t.procedure
        .input(z.union([z.string(), z.object({ json: z.string() })]))
        .mutation(async (req) => {
            try {
                const input = typeof req.input === 'string' ? req.input : req.input.json;
                const lines = input.split('\n').filter((line) => line.trim());

                if (lines.length < 2) {
                    throw new TRPCError({
                        code: 'BAD_REQUEST',
                        message: 'CSV has no data rows',
                    });
                }

                const headers = parseCSVLine(lines[0]);
                const headerMap: Record<string, string> = {
                    'Department ID': 'deptId',
                    'Department Name': 'deptName',
                    'Phone Number': 'phone',
                    'Location ID': 'locIds',
                    Floor: 'floors',
                    Suite: 'suites',
                    'Building ID': 'bldgId',
                    'Building Name': 'bldgName',
                    'Building Address': 'bldgAddr',
                    'Building Phone Number': 'bldgPhone',
                    'Service ID': 'svcIds',
                    Services: 'svcNames',
                };

                // Process each data row
                for (let i = 1; i < lines.length; i++) {
                    const values = parseCSVLine(lines[i]);
                    if (values.length < 4) continue;

                    // Map CSV data to record object
                    type RecordType = Record<string, string>;
                    const record: RecordType = {};
                    headers.forEach((header, j) => {
                        const key = headerMap[header];
                        if (key && j < values.length) {
                            record[key] = values[j].replace(/^"|"$/g, '').trim();
                        }
                    });

                    // Parse IDs
                    const deptId = parseInt(record.deptId || '', 10);
                    const bldgId = parseInt(record.bldgId || '', 10);
                    if (isNaN(deptId) || isNaN(bldgId)) continue;

                    // Upsert building
                    const building = await PrismaClient.building.upsert({
                        where: { id: bldgId },
                        update: {
                            name: record.bldgName || '',
                            address: record.bldgAddr || '',
                            phoneNumber: (record.bldgPhone || '').replace(/\D/g, ''),
                        },
                        create: {
                            id: bldgId,
                            name: record.bldgName || '',
                            address: record.bldgAddr || '',
                            phoneNumber: (record.bldgPhone || '').replace(/\D/g, ''),
                        },
                    });

                    // Upsert department
                    const department = await PrismaClient.department.upsert({
                        where: { id: deptId },
                        update: {
                            name: record.deptName || '',
                            phoneNumber: (record.phone || '').replace(/\D/g, ''),
                            buildingID: building.id,
                        },
                        create: {
                            id: deptId,
                            name: record.deptName || '',
                            phoneNumber: (record.phone || '').replace(/\D/g, ''),
                            buildingID: building.id,
                        },
                    });

                    // Handle locations (potentially multiple)
                    const locIds = (record.locIds || '')
                        .split(';')
                        .map((id) => id.trim())
                        .filter(Boolean);
                    const floors = (record.floors || '').split(';').map((f) => f.trim());
                    const suites = (record.suites || '').split(';').map((s) => s.trim());

                    for (let j = 0; j < locIds.length; j++) {
                        const locId = parseInt(locIds[j], 10);
                        if (isNaN(locId)) continue;

                        const floor = j < floors.length ? parseInt(floors[j], 10) || 1 : 1;
                        const suite = j < suites.length ? suites[j] : '';

                        // Create location without a node
                        await PrismaClient.location.upsert({
                            where: { id: locId },
                            update: {
                                departmentId: department.id,
                                floor,
                                suite,
                                // No nodeID needed anymore
                            },
                            create: {
                                id: locId,
                                departmentId: department.id,
                                floor,
                                suite,
                                // No nodeID needed anymore
                            },
                        });
                    }

                    // Handle services (potentially multiple)
                    const svcIds = (record.svcIds || '')
                        .split(';')
                        .map((id) => id.trim())
                        .filter(Boolean);
                    const svcNames = (record.svcNames || '').split(';').map((s) => s.trim());

                    for (let k = 0; k < svcIds.length; k++) {
                        const svcId = parseInt(svcIds[k], 10);
                        if (isNaN(svcId)) continue;

                        const svcName = k < svcNames.length ? svcNames[k] : record.deptName || '';

                        // Upsert service
                        const service = await PrismaClient.service.upsert({
                            where: { id: svcId },
                            update: { name: svcName },
                            create: { id: svcId, name: svcName },
                        });

                        // Link service to department if not already linked
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

                return { message: 'Import succeeded' };
            } catch (error) {
                const msg = error instanceof Error ? error.message : String(error);
                throw new TRPCError({
                    code: 'INTERNAL_SERVER_ERROR',
                    message: `Import error: ${msg}`,
                });
            }
        }),
});
