import { t } from "../trpc.ts";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { BFS } from "./algos/BFS.ts";
import { DFS } from "./algos/DFS.ts";
import { SearchSystem } from "./algos/SearchSystem.ts";
import PrismaClient from "../bin/prisma-client.ts";
import { Algorithm } from "database";

export const pathfindingRouter = t.router({
  getCurrentAlgorithm: t.procedure.query(async () => {
    try {
      const searchAlgorithm = await PrismaClient.searchAlgorithm.findFirst();
      if (!searchAlgorithm) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "SearchAlgorithm not found in the database.",
        });
      }
      return searchAlgorithm.current;
    } catch (error) {
      console.error("Error fetching current algorithm:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "An error occurred while fetching the current algorithm.",
      });
    }
  }),

  toggleAlgorithm: t.procedure
    .input(
      z.object({
        algorithm: z.enum([Algorithm.BFS, Algorithm.DFS]),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        const updatedAlgorithm = await PrismaClient.searchAlgorithm.update({
          where: { id: 1 }, // or { id: searchAlgorithm.id } if it's dynamically auto-incremented, but for now it's defaulted to id:1
          data: {
            current: input.algorithm,
          },
        });

        return updatedAlgorithm.current;
      } catch (error) {
        console.error("Error toggling algorithm:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An error occurred while toggling the algorithm.",
        });
      }
    }),

  pathFind: t.procedure
    .input(
      z.object({
        dropOffLatitude: z.number(),
        dropOffLongitude: z.number(),
        endNodeId: z.number(),
        buildingId: z.number(),
        driving: z.boolean(),
      }),
    )
    .query(async ({ input }) => {
      try {
        // fetch the current algorithm
        const searchAlgorithm = await PrismaClient.searchAlgorithm.findFirst();
        if (!searchAlgorithm) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "SearchAlgorithm not found in the database.",
          });
        }

        let path;
        const searchSystem = new SearchSystem(
          searchAlgorithm.current === Algorithm.BFS ? new BFS() : new DFS(),
        );

        path = await searchSystem.path(
          input.dropOffLatitude,
          input.dropOffLongitude,
          input.endNodeId,
          input.buildingId,
          input.driving,
        );

        return path;
      } catch (error) {
        console.error("Error performing pathfinding:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An error occurred while performing pathfinding.",
        });
      }
    }),
});

export type pathfindingRouter = typeof pathfindingRouter;
