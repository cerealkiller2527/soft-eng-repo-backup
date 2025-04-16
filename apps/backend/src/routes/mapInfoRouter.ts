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

    // Get basic department info by ID
    getDepartmentInfo: t.procedure.input(z.object({ id: z.number() })).query(async ({ input }) => {
        try {
            return await PrismaClient.department.findUnique({
                where: { id: input.id },
                select: {
                    id: true,
                    name: true,
                    phoneNumber: true,
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

    // Get all nodes with location types for a building by name
    getNodesByBuildingName: t.procedure
        .input(z.object({ buildingName: z.string() }))
        .query(async ({ input }) => {
            try {
                // First find the building by name
                const building = await PrismaClient.building.findFirst({
                    where: { name: input.buildingName },
                    select: { id: true }
                });

                if (!building) {
                    throw new Error(`Building with name '${input.buildingName}' not found`);
                }

                // Then get all nodes for that building with their types
                return await PrismaClient.node.findMany({
                    where: { buildingId: building.id },
                    select: {
                        id: true,
                        floor: true,
                        suite: true,
                        type: true,
                        description: true,
                        lat: true,
                        long: true
                    },
                    orderBy: [
                        { floor: 'asc' },
                        { suite: 'asc' }
                    ]
                });
            } catch (error) {
                console.error(
                    `Error fetching nodes for building '${input.buildingName}':`,
                    error
                );
                throw new Error('Failed to fetch building nodes');
            }
        }),
});

export type mapInfoRouter = typeof mapInfoRouter;
