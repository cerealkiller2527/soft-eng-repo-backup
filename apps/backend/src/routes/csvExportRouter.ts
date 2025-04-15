import { initTRPC, TRPCError } from '@trpc/server';
import PrismaClient from '../bin/prisma-client';
import { stringify } from 'csv/sync';

export const t = initTRPC.create();

export const csvExportRouter = t.router({
    exportCSV: t.procedure.mutation(async () => {
        try {
            //get all the node with all the department, service, and building info
            const nodes = await PrismaClient.node.findMany({
                include: {
                    building: true,
                    Department: {
                        include: {
                            DepartmentServices: { include: { service: true } },
                        },
                    },
                    fromEdge: true,
                },
            });

            //map the nodes so that we can create each row
            const rows = nodes.map((node) => {
                const department = node.Department;
                const building = node.building;

                const services = department?.DepartmentServices || [];
                const serviceIds = services.map((s) => s.serviceID).join('; ');
                const serviceNames = services.map((s) => s.service?.name || '').join('; ');

                return {
                    'Node Type': node.type,
                    'Node Description': node.description,
                    Floor: node.floor,
                    Suite: node.suite,
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
                    Services: serviceNames,
                };
            });

            //create the csv
            const csv = stringify(rows, { header: true });
            //return the csv
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
