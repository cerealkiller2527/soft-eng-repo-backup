// src/routes/mapInfoRouter.ts
import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import PrismaClient from '../bin/prisma-client';

// Initialize tRPC
export const t = initTRPC.create();

export const mapInfoRouter = t.router({
    // Building Information
    // -------------------

    // Get list of buildings for dropdowns/selection
    getBuildings: t.procedure.query(async () => {
        try {
            return await PrismaClient.building.findMany({
                select: {
                    id: true,
                    name: true,
                    address: true,
                },
            });
        } catch (error) {
            console.error('Error fetching buildings:', error);
            throw new Error('Failed to fetch buildings');
        }
    }),

    // Get basic building info by ID
    getBuildingInfo: t.procedure.input(z.object({ id: z.number() })).query(async ({ input }) => {
        try {
            return await PrismaClient.building.findUnique({
                where: { id: input.id },
                select: {
                    id: true,
                    name: true,
                    address: true,
                    phoneNumber: true,
                },
            });
        } catch (error) {
            console.error(`Error fetching building info for ID ${input.id}:`, error);
            throw new Error('Failed to fetch building info');
        }
    }),

    // Get available floors for a building (for dropdown/selection)
    getBuildingFloors: t.procedure
        .input(z.object({ buildingId: z.number() }))
        .query(async ({ input }) => {
            try {
                const floors = await PrismaClient.node.findMany({
                    where: { buildingId: input.buildingId },
                    select: { floor: true },
                    distinct: ['floor'],
                    orderBy: { floor: 'asc' },
                });

                return floors.map((f) => f.floor);
            } catch (error) {
                console.error(`Error fetching floors for building ID ${input.buildingId}:`, error);
                throw new Error('Failed to fetch building floors');
            }
        }),

    // Department Information
    // ---------------------

    // Get departments for a building (for dropdown/selection)
    getBuildingDepartments: t.procedure
        .input(z.object({ buildingId: z.number() }))
        .query(async ({ input }) => {
            try {
                return await PrismaClient.department.findMany({
                    where: { buildingID: input.buildingId },
                    select: {
                        id: true,
                        name: true,
                    },
                    orderBy: { name: 'asc' },
                });
            } catch (error) {
                console.error(
                    `Error fetching departments for building ID ${input.buildingId}:`,
                    error
                );
                throw new Error('Failed to fetch building departments');
            }
        }),

    // Get basic department info by ID
    getDepartmentInfo: t.procedure.input(z.object({ id: z.number() })).query(async ({ input }) => {
        try {
            return await PrismaClient.department.findUnique({
                where: { id: input.id },
                select: {
                    id: true,
                    name: true,
                    phoneNumber: true,
                    buildingID: true,
                },
            });
        } catch (error) {
            console.error(`Error fetching department info for ID ${input.id}:`, error);
            throw new Error('Failed to fetch department info');
        }
    }),

    // Get departments on a specific floor (for selection)
    getFloorDepartments: t.procedure
        .input(
            z.object({
                buildingId: z.number(),
                floor: z.number(),
            })
        )
        .query(async ({ input }) => {
            try {
                // Find departments with nodes on this floor
                const departmentNodes = await PrismaClient.node.findMany({
                    where: {
                        buildingId: input.buildingId,
                        floor: input.floor,
                        departmentId: { not: null },
                    },
                    select: {
                        departmentId: true,
                        Department: {
                            select: {
                                id: true,
                                name: true,
                            },
                        },
                    },
                    distinct: ['departmentId'],
                });

                // Extract just the departments
                return departmentNodes
                    .filter((node) => node.Department !== null)
                    .map((node) => node.Department);
            } catch (error) {
                console.error(
                    `Error fetching departments for building ${input.buildingId}, floor ${input.floor}:`,
                    error
                );
                throw new Error('Failed to fetch floor departments');
            }
        }),
});

export type MapInfoRouter = typeof mapInfoRouter;
