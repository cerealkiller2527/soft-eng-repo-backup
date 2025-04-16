import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import PrismaClient from '../bin/prisma-client';

export const t = initTRPC.create();

export const directoriesRouter = t.router({
    // Get all departments with their services and locations
    getAllDepartments: t.procedure.query(async () => {
        return PrismaClient.department.findMany({
            include: {
                DepartmentServices: {
                    include: {
                        service: true,
                    },
                },
                node: {
                    include: {
                        building: true,
                    },
                },
            },
            orderBy: {
                name: 'asc',
            },
        });
    }),

    // Get a single department by name (keeping this for backward compatibility)
    getDepartment: t.procedure.input(z.object({ name: z.string() })).query(async ({ input }) => {
        return PrismaClient.department.findFirst({
            where: {
                name: input.name,
            },
            include: {
                DepartmentServices: {
                    include: {
                        service: true,
                    },
                },
                node: {
                    include: {
                        building: true,
                    },
                },
            },
        });
    }),

    // Get a single department by ID
    getDepartmentById: t.procedure.input(z.object({ id: z.number() })).query(async ({ input }) => {
        return PrismaClient.department.findUnique({
            where: {
                id: input.id,
            },
            include: {
                DepartmentServices: {
                    include: {
                        service: true,
                    },
                },
                node: {
                    include: {
                        building: true,
                    },
                },
            },
        });
    }),
});

export type DirectoriesRouter = typeof directoriesRouter;
