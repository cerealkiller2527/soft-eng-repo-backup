import { initTRPC, TRPCError } from '@trpc/server';
import { z } from 'zod';
import { stringify } from 'csv/sync';
import prisma from '../bin/prisma-client';

const t = initTRPC.create();

const nodeTypeEnum = z.enum([
    'Entrance',
    'Intermediary',
    'Staircase',
    'Elevator',
    'Location',
    'Help_Desk',
]);

const CSVRowSchema = z.object({
    'Building ID': z.string().optional(),
    'Building Name': z.string(),
    'Building Address': z.string(),
    'Building Phone': z.string(),
    'Location ID': z.string().optional(),
    Floor: z.string(),
    Suite: z.string().optional(),
    'Node ID': z.string().optional(),
    'Node Type': nodeTypeEnum,
    'Node Description': z.string(),
    'Node Coordinates': z.string(),
    'From Edges': z.string(),
    'To Edges': z.string(),
    'Department ID': z.string().optional(),
    'Department Name': z.string(),
    'Department Phone': z.string(),
    'Department Description': z.string().optional(),
    Services: z.string(),
});

type CSVRow = z.infer<typeof CSVRowSchema>;

export const csvExportRouter = t.router({
    exportCSV: t.procedure.query(async () => {
        try {
            const buildings = await prisma.building.findMany({
                include: {
                    Location: {
                        include: {
                            Department: {
                                include: {
                                    DepartmentServices: {
                                        include: {
                                            service: true,
                                        },
                                    },
                                },
                            },
                            node: {
                                include: {
                                    fromEdge: true,
                                    toEdge: true,
                                },
                            },
                        },
                    },
                },
            });

            const rows: CSVRow[] = buildings.flatMap((building) =>
                building.Location.map((location) => ({
                    'Building ID': building.id?.toString(),
                    'Building Name': building.name,
                    'Building Address': building.address,
                    'Building Phone': building.phoneNumber,
                    'Location ID': location.id?.toString(),
                    Floor: location.floor?.toString(),
                    Suite: location.suite || '',
                    'Node ID': location.nodeID?.toString() || '',
                    'Node Type': location.node?.type || 'Location',
                    'Node Description': location.node?.description || '',
                    'Node Coordinates': location.node
                        ? `${location.node.lat}, ${location.node.long}`
                        : '',
                    'From Edges':
                        location.node?.fromEdge
                            .map((edge) => edge.toNodeId)
                            .filter(Boolean)
                            .join(',') || '',
                    'To Edges':
                        location.node?.toEdge
                            .map((edge) => edge.fromNodeId)
                            .filter(Boolean)
                            .join(',') || '',
                    'Department ID': location.departmentId?.toString() || '',
                    'Department Name': location.Department?.name || '',
                    'Department Phone': location.Department?.phoneNumber || '',
                    'Department Description': location.Department?.description || '',
                    Services:
                        location.Department?.DepartmentServices.map((ds) => ds.service.name)
                            .filter(Boolean)
                            .join(',') || '',
                }))
            );

            return stringify(rows, {
                header: true,
                columns: Object.keys(CSVRowSchema.shape),
            });
        } catch (error) {
            throw new TRPCError({
                code: 'INTERNAL_SERVER_ERROR',
                message: error instanceof Error ? error.message : 'Failed to export CSV',
            });
        }
    }),
});

export type CSVExportRouter = typeof csvExportRouter;
