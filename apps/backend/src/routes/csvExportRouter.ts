import { initTRPC, TRPCError } from '@trpc/server';
import PrismaClient from '../bin/prisma-client';

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

export const csvExportRouter = t.router({
    // CSV Export functionality
    exportCSV: t.procedure.mutation(async () => {
        try {
            const departments = await PrismaClient.department.findMany({
                include: {
                    Location: true,
                    building: true,
                    DepartmentServices: { include: { service: true } },
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

            if (departments.length === 0) {
                return headers.join(',');
            }

            // Get all locations for lookup
            const allLocations = await PrismaClient.location.findMany();
            const locationMap = new Map<number, typeof allLocations>();

            // Build location lookup by department
            allLocations.forEach((loc) => {
                if (!loc.departmentId) return;
                const existing = locationMap.get(loc.departmentId) || [];
                locationMap.set(loc.departmentId, [...existing, loc]);
            });

            const rows = departments.map((dept) => {
                // Services data
                const services = dept.DepartmentServices || [];
                const serviceNames = services
                    .map((ds) => ds?.service?.name || '')
                    .filter(Boolean)
                    .join('; ');
                const serviceIds = services
                    .map((ds) => ds?.serviceID || '')
                    .filter(Boolean)
                    .join('; ');

                // Merge locations from direct relations and lookup map
                let locations = [...(dept.Location || [])];
                if (locationMap.has(dept.id)) {
                    locations = locations.concat(locationMap.get(dept.id) || []);
                }

                // Deduplicate locations by ID
                const uniqueLocations: Record<number, any> = {};
                locations.forEach((loc) => {
                    if (loc && loc.id) uniqueLocations[loc.id] = loc;
                });
                locations = Object.values(uniqueLocations);

                // Extract location data
                const locationIds = locations
                    .map((loc) => loc?.id || '')
                    .filter(Boolean)
                    .join('; ');
                const floors = locations
                    .map((loc) => loc?.floor || '')
                    .filter(Boolean)
                    .join('; ');
                const suites = locations
                    .map((loc) => loc?.suite || '')
                    .filter(Boolean)
                    .join('; ');

                return [
                    dept.id || '',
                    `"${dept.name || ''}"`,
                    `"${dept.phoneNumber || ''}"`,
                    locationIds,
                    floors,
                    `"${suites}"`,
                    dept.building?.id || '',
                    `"${dept.building?.name || ''}"`,
                    `"${dept.building?.address || ''}"`,
                    `"${dept.building?.phoneNumber || ''}"`,
                    serviceIds,
                    `"${serviceNames}"`,
                ].join(',');
            });

            return [headers.join(','), ...rows].join('\n');
        } catch (error) {
            const msg = error instanceof Error ? error.message : String(error);
            throw new TRPCError({
                code: 'INTERNAL_SERVER_ERROR',
                message: `Export error: ${msg}`,
            });
        }
    }),

    // Get department data as JSON (useful for frontend)
    getAllDepartments: t.procedure.query(async () => {
        try {
            return await PrismaClient.department.findMany({
                include: {
                    Location: true,
                    building: true,
                    DepartmentServices: { include: { service: true } },
                },
            });
        } catch (error) {
            throw new TRPCError({
                code: 'INTERNAL_SERVER_ERROR',
                message: 'Error fetching departments',
            });
        }
    }),
});
