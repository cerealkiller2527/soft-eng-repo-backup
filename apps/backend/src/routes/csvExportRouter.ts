import { initTRPC, TRPCError } from '@trpc/server';
import PrismaClient from '../bin/prisma-client';
import { stringify } from 'csv/sync';

export const t = initTRPC.create();

export const csvExportRouter = t.router({
    exportCSV: t.procedure.mutation(async () => {
        try {
            // Get all nodes with their locations, departments, services, and building info
            const nodes = await PrismaClient.node.findMany({
                include: {
                    Location: {
                        include: {
                            building: true,
                            Department: {
                                include: {
                                    DepartmentServices: { include: { service: true } },
                                },
                            },
                        },
                    },
                    fromEdge: true,
                },
            });

            // Map the nodes to create each row
            const rows = nodes.flatMap(node => {
                return node.Location.map(location => {
                    const department = location.Department;
                    const building = location.building;

                    const services = department?.DepartmentServices || [];
                    const serviceNames = services.map((s) => s.service?.name || '').join('; ');

                    return {
                        'Node Type': node.type,
                        'Node Description': node.description,
                        'Floor': location.floor.toString(),
                        'Suite': location.suite || '',
                        'Node (lat,long)': `(${node.lat}, ${node.long})`,
                        'Edge Connections (from -> to)': node.fromEdge
                            .map((e) => `${e.fromNodeId}->${e.toNodeId}`)
                            .join('; '),
                        'Building Name': building?.name || '',
                        'Building Address': building?.address || '',
                        'Building Phone Number': building?.phoneNumber || '',
                        'Department Name': department?.name || '',
                        'Phone Number': department?.phoneNumber || '',
                        'Department Description': department?.description || '',
                        'Services': serviceNames,
                    };
                });
            });

            // Create the CSV
            const csv = stringify(rows, { header: true });
            return csv;
        } catch (error) {
            const msg = error instanceof Error ? error.message : String(error);
            throw new TRPCError({
                code: 'INTERNAL_SERVER_ERROR',
                message: `Export error: ${msg}`,
            });
        }
    }),
});
