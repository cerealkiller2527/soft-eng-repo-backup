import { initTRPC } from '@trpc/server';
import PrismaClient from '../bin/prisma-client';
export const t = initTRPC.create();
export const employeeRouter = t.router({
    getEmployee: t.procedure.query(async () => {
        return PrismaClient.employee.findMany();
    }),
});
// export type definition of API
export type employeeRouter = typeof employeeRouter;
