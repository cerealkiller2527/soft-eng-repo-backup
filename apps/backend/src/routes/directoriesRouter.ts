import { t } from "../trpc.ts";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import PrismaClient from "../bin/prisma-client";

const DepartmentSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  phoneNumber: z.string(),
  DepartmentServices: z.array(
    z.object({
      service: z.object({
        id: z.number(),
        name: z.string(),
      }),
    }),
  ),
  Location: z.array(
    z.object({
      id: z.number(),
      floor: z.number(),
      suite: z.string().nullable(),
      buildingId: z.number(),
      building: z.object({
        id: z.number(),
        name: z.string(),
        address: z.string(),
        phoneNumber: z.string(),
      }),
      nodeID: z.number().nullable(),
      node: z
        .object({
          id: z.number(),
          type: z.enum([
            "Entrance",
            "Intermediary",
            "Staircase",
            "Elevator",
            "Location",
            "Help_Desk",
          ]),
          description: z.string(),
          lat: z.number(),
          long: z.number(),
        })
        .nullable(),
    }),
  ),
});

export const directoriesRouter = t.router({
  getAllDepartments: t.procedure
    .output(z.array(DepartmentSchema))
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
    .output(DepartmentSchema)
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
