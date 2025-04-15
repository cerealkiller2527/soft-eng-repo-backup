import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import PrismaClient from '../bin/prisma-client';

export const t = initTRPC.create();

export const departmentRouter = t.router({
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
                    select: {
                        floor: true,
                        suite: true,
                    },
                },
            },
        });
    }),
});

export type DepartmentRouter = typeof departmentRouter;
