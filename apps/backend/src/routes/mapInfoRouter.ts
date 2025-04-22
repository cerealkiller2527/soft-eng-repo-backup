import {initTRPC} from "@trpc/server";
import PrismaClient from "../bin/prisma-client.ts";
import {z} from "zod";
import prismaClient from "../bin/prisma-client.ts";

export const t = initTRPC.create();
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
                    throw new Error(`Building with name '${input.buildingName}' not found`);
                }

                const locations = await PrismaClient.location.findMany({
                    where: {
                        buildingId: building.id,
                    }
                })
                return [
                    ...new Set(
                        locations
                            .map(location => location.suite)
                            .filter((suite): suite is string => suite !== null && suite !== undefined)
                    ),
                ];
            } catch (error) {
                console.error(`Error fetching nodes for building '${input.buildingName}':`, error);
                throw new Error('Failed to fetch building nodes');
            }
        }),
})