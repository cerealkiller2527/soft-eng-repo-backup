import { t } from "../trpc.ts";
import PrismaClient from "../bin/prisma-client.ts";
import { z } from "zod";
import prismaClient from "../bin/prisma-client.ts";

export const mapInfoRouter = t.router({
  mapInfo: t.procedure
    .input(z.object({ buildingName: z.string() }))
    .query(async ({ input }) => {
      try {
        // First find the building by name
        const building = await PrismaClient.building.findFirst({
          where: { name: input.buildingName },
          select: { id: true },
        });

        if (!building) {
          throw new Error(
            `Building with name '${input.buildingName}' not found`,
          );
        }

        // Find all departments that have locations in this building with nodes
        const departments = await PrismaClient.department.findMany({
          where: {
            Location: {
              some: {
                buildingId: building.id,
                nodeID: { not: null },
                node: {
                  is: {
                    type: "Location",
                  },
                },
              },
            },
          },
          select: {
            name: true,
          },
        });

        // Return array of department names
        return departments.map((dept) => dept.name);
      } catch (error) {
        console.error(
          `Error fetching departments for building '${input.buildingName}':`,
          error,
        );
        throw new Error("Failed to fetch building departments");
      }
    }),
});
