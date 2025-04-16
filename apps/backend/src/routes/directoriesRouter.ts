import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import PrismaClient from '../bin/prisma-client';

const t = initTRPC.create();

export const directoriesRouter = t.router({
    getAllDepartments: t.procedure.query(() =>
        PrismaClient.department.findMany({
            include: {
                DepartmentServices: {
                    include: { service: true },
                },
                node: {
                    include: { building: true },
                },
            },
            orderBy: { name: 'asc' },
        })
    ),

    getDepartmentById: t.procedure.input(z.object({ id: z.number() })).query(({ input }) =>
        PrismaClient.department.findUnique({
            where: { id: input.id },
            include: {
                DepartmentServices: {
                    include: { service: true },
                },
                node: {
                    include: { building: true },
                },
            },
        })
    ),
});

export type DirectoriesRouter = typeof directoriesRouter;
