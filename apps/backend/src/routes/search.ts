import { z } from "zod";
import { initTRPC, TRPCError } from "@trpc/server";
import { BFS } from "./algos/BFS.ts";
import { SearchSystem } from "./algos/SearchSystem.ts";

import { pNodeDTO } from "../../../../share/types.ts";
import { pNode } from "../../../backend/src/routes/algos/pNode.ts";
import PrismaClient from "../bin/prisma-client.ts";
import { DFS } from "./algos/DFS.ts";

export const t = initTRPC.create();

export const searchRouter = t.router({
  getPath: t.procedure
    .input(
      z.object({
        buildingName: z.string(),
        endSuite: z.string(),
        startSuite: z.string(),
        driving: z.boolean(),
        algorithm: z.string(),
      }),
    )
    .query(async ({ input }) => {
      try {
        const endLocation = await PrismaClient.location.findFirst({
          where: {
            suite: input.endSuite,
          },
        });
        const endNode = await PrismaClient.node.findFirst({
          where: {
            id: endLocation!.nodeID ?? -1,
          },
        });

        const s = new SearchSystem(new BFS());

        if (input.algorithm === "DFS") {
          s.changeAlgorithm(new DFS());
        }

        const nodePath = await s.path(
          input.buildingName,
          endNode!.description,
          input.driving,
        );

        const nodeIds = nodePath.map((node) => node.id);

        const locations = await PrismaClient.location.findMany({
          where: {
            nodeID: { in: nodeIds },
          },
          select: {
            nodeID: true,
            floor: true,
          },
        });

        const floorMap = new Map<number, number>();
        locations.forEach((location) => {
          if (location.nodeID !== null) {
            floorMap.set(location.nodeID, location.floor);
          }
        });

        const pNodeDTOS: pNodeDTO[] = nodePath.map((node) => ({
          id: node.id,
          description: node.description,
          latitude: node.latitude,
          longitude: node.longitude,
          floor: floorMap.get(node.id) ?? -1,
          neighbors: node.neighbors.map((neighbor) => ({
            id: neighbor.id,
          })),
        }));

        return pNodeDTOS;
      } catch (error) {
        console.error("Error finding path:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An error occurred while finding path.",
        });
      }
    }),
});

export type searchRouter = typeof searchRouter;
