import { t, protectedProcedure } from "../trpc.ts";
import PrismaClient from "../bin/prisma-client";
export const employeeRouter = t.router({
  getEmployee: protectedProcedure.query(async () => {
    return PrismaClient.employee.findMany({});
  }),
});
// export type definition of API
export type employeeRouter = typeof employeeRouter;
