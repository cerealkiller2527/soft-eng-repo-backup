import { initTRPC, TRPCError } from '@trpc/server';
import PrismaClient from '../bin/prisma-client';
import { z } from 'zod';

export const t = initTRPC.create();

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

export const csvRouter = t.router({
    exportCSV: t.procedure.query(async () => {
        const departments = await PrismaClient.department.findMany({
            include: {
                Location: true,
                building: true,
                DepartmentServices: {
                    include: { service: true },
                },
            },
        });

        const headers = [
            'Department ID',
            'Department Name',
            'Phone Number',
            'Location ID',
            'Floor',
            'Suite',
            'Building ID',
            'Building Name',
            'Building Address',
            'Building Phone Number',
            'Service ID',
            'Services',
        ];

        const rows = departments.map((dept) => {
            console.log('Processing department:', dept);

            const serviceNames = dept.DepartmentServices.map((ds) => ds.service.name).join('; ');

            const locationIds = dept.Location.map((loc) => loc.id).join('; ');
            const floors = dept.Location.map((loc) => loc.floor).join('; ');
            const suites = dept.Location.map((loc) => loc.suite).join('; ');
            const departmentServiceIds = dept.DepartmentServices.map((ds) => ds.serviceID).join(
                '; '
            );

            const buildingId = dept.building?.id || '';
            const buildingPhoneNumber = dept.building?.phoneNumber || '';

            console.log('Building ID:', buildingId);
            console.log('Building Phone Number:', buildingPhoneNumber);

            return [
                `${dept.id}`,
                `"${dept.name}"`,
                `"${dept.phoneNumber}"`,
                `${locationIds}`,
                `${floors}`,
                `"${suites}"`,
                `${buildingId}`,
                `"${dept.building.name}"`,
                `"${dept.building.address}"`,
                `"${buildingPhoneNumber}"`,
                `${departmentServiceIds}`,
                `"${serviceNames}"`,
            ].join(',');
        });
        return [headers.join(','), ...rows].join('\n');
    }),

    importCSV: t.procedure
        .input(z.string())
        .mutation(async ({input}) => {
            const lines = input.split('\n').filter((line) => line.trim() !== '');
            const headers = parseCSVLine(lines[0]);

            // Header-to-field map
            const headerMap: Record<string, string> = {
                'Department ID': 'departmentID',
                'Department Name': 'departmentName',
                'Phone Number': 'phoneNumber',
                'Location ID': 'locationID',
                Floor: 'floor',
                Suite: 'suite',
                'Building ID': 'buildingID',
                'Building Name': 'buildingName',
                'Building Address': 'buildingAddress',
                'Building Phone Number': 'buildingPhoneNumber',
                'Service ID': 'serviceID',
                Services: 'serviceName',
            };

            const clean = (value: string): string => {
                return value?.replace(/^"|"$/g, '').trim();
            };

            for (let i = 1; i < lines.length; i++) {
                const values = parseCSVLine(lines[i]);

                const record: any = {};
                headers.forEach((header, j) => {
                    const key = headerMap[header];
                    if (key) {
                        record[key] = clean(values[j]);
                    }
                });

                try {
                    console.log('Processing record:', record);

                    // Building
                    const buildingId = parseInt(record.buildingID, 10);
                    if (isNaN(buildingId)) {
                        throw new TRPCError({
                            code: 'BAD_REQUEST',
                            message: 'Invalid building ID',
                        });
                    }

                    const building = await PrismaClient.building.upsert({
                        where: { id: buildingId },
                        update: {
                            address: record.buildingAddress,
                            phoneNumber: record.buildingPhoneNumber?.replace(/\D/g, ''),
                        },
                        create: {
                            id: buildingId,
                            name: record.buildingName,
                            address: record.buildingAddress,
                            phoneNumber: record.buildingPhoneNumber?.replace(/\D/g, ''),
                        },
                    });

                    // Department
                    const departmentId = parseInt(record.departmentID, 10);
                    const department = await PrismaClient.department.upsert({
                        where: { id: departmentId },
                        update: {
                            phoneNumber: record.phoneNumber.replace(/\D/g, ''),
                            buildingID: building.id,
                        },
                        create: {
                            id: departmentId,
                            name: record.departmentName,
                            phoneNumber: record.phoneNumber.replace(/\D/g, ''),
                            buildingID: building.id,
                        },
                    });

                    // Service
                    const serviceId = parseInt(record.serviceID, 10);
                    const service = await PrismaClient.service.upsert({
                        where: { id: serviceId },
                        update: {},
                        create: {
                            id: serviceId,
                            name: record.serviceName,
                        },
                    });

                    // DepartmentService join
                    await PrismaClient.departmentServices.create({
                        data: {
                            departmentID: department.id,
                            serviceID: service.id,
                        },
                    });
                } catch (err) {
                    throw new TRPCError({
                        code: 'INTERNAL_SERVER_ERROR',
                        message: 'Error processing record:',
                    });
                }
            }
        })
})