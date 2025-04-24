import { initTRPC } from "@trpc/server";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import PrismaClient from "../bin/prisma-client";
import {departmentSchema, locationSchema} from "../../../../share/Schemas.ts";

const t = initTRPC.create();



export const directoriesRouter = t.router({
  getAllDepartments: t.procedure
    .output(z.array(departmentSchema))
    .query(async () => {
      const departments = await PrismaClient.department.findMany({
        include: {
          DepartmentServices: {
            include: { service: true },
          },
          Location: {
            include: {
              building: true,
              node: true,
            },
          },
        },
        orderBy: { name: "asc" },
      });

      return departments;
    }),

  getDepartmentById: t.procedure
    .input(z.object({ id: z.number() }))
    .output(departmentSchema)
    .query(async ({ input }) => {
      const department = await PrismaClient.department.findUnique({
        where: { id: input.id },
        include: {
          DepartmentServices: {
            include: { service: true },
          },
          Location: {
            include: {
              building: true,
              node: true,
            },
          },
        },
      });

      if (!department) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `Department with id ${input.id} not found`,
        });
      }

      return department;
    }),
});

export type DirectoriesRouter = typeof directoriesRouter;
