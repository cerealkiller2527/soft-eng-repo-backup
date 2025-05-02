import { t } from "../trpc.ts";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { BFS } from "./algos/BFS.ts";
import { SearchSystem } from "./algos/SearchSystem.ts";

import { pNodeDTO } from "../../../../share/types.ts";
import PrismaClient from "../bin/prisma-client.ts";
import { DFS } from "./algos/DFS.ts";
import {
  pNodeZT,
  searchInput,
  searchInputForRouter,
  searchOutput,
} from "common/src/ZodSchemas.ts";

export const searchRouter = t.router({
  getPath: t.procedure.input(searchInputForRouter).query(async ({ input }) => {
    try {
      // get end location and node
      const endLocation = await PrismaClient.location.findFirst({
        where: {
          Department: {
            name: input.endDeptName,
          },
          building: {
            name: input.buildingName,
          }
        },
        select: {
          nodeID: true,
        },
      });

      const endNodeId = endLocation!.nodeID;

      // check database for which algorithm to use and create search system to match
      const algorithm = await PrismaClient.searchAlgorithm.findFirst()
      const s = new SearchSystem(new BFS());
      if(algorithm?.current === "BFS"){
        s.changeAlgorithm(new BFS())
      }else if (algorithm?.current === "DFS"){
        s.changeAlgorithm(new DFS())
      }


      if (input.buildingName === "") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Building name cannot be empty.",
        });
      }
      const buildingId = await PrismaClient.building.findFirst({
        where: {
          name: input.buildingName,
        },
      });

      console.log(buildingId);
      const paths = await s.path(
        input.dropOffLatitude,
        input.dropOffLongitude,
        endNodeId!,
        buildingId!.id,
        input.driving,
      );
      console.log("SEARCH.TS");

      console.log(paths);

      const returnPaths = searchOutput.parse(paths);
      const pNodeZTs = [...returnPaths.toParking, ...returnPaths.toDepartment];

      //////////////////////////////////////////////////////////////////////////////////////
      // SKIPPER'S WACK AH CODE STARTS HERE
      type Direction = string;

      function getWalkingDirections(pNodeZTs: pNodeZT[]): Direction[] {
        const directions: Direction[] = [];

        for (let i = 0; i < pNodeZTs.length - 1; i++) {
          const current = pNodeZTs[i];
          const next = pNodeZTs[i + 1];

          const deltaLng = next.longitude - current.longitude;
          const deltaLat = next.latitude - current.latitude;
          const floorChanged = next.floor !== current.floor;

          const compass = getCompassDirection(deltaLng, deltaLat);
          const distance = getDistance(
            current.latitude,
            current.longitude,
            next.latitude,
            next.longitude,
          );

          let step = `Walk from "${current.description}" to "${next.description}"`;

          if (floorChanged) {
            const floorDirection = next.floor > current.floor ? "up" : "down";
            step += `, go ${floorDirection} to floor ${next.floor}`;
          }

          step += ` (${Math.round(distance)} meters, heading ${compass})`;

          directions.push(step);
        }

        return directions;
      }

      function getCompassDirection(deltaLng: number, deltaLat: number): string {
        const angleDegrees = Math.atan2(deltaLat, deltaLng) * (180 / Math.PI);

        if (angleDegrees >= -22.5 && angleDegrees < 22.5) return "East";
        if (angleDegrees >= 22.5 && angleDegrees < 67.5) return "Northeast";
        if (angleDegrees >= 67.5 && angleDegrees < 112.5) return "North";
        if (angleDegrees >= 112.5 && angleDegrees < 157.5) return "Northwest";
        if (angleDegrees >= 157.5 || angleDegrees < -157.5) return "West";
        if (angleDegrees >= -157.5 && angleDegrees < -112.5) return "Southwest";
        if (angleDegrees >= -112.5 && angleDegrees < -67.5) return "South";
        if (angleDegrees >= -67.5 && angleDegrees < -22.5) return "Southeast";

        return "No Dir."; // this should never return
      }

      // distance calculation (feet))
      function getDistance(
        lat1: number,
        lng1: number,
        lat2: number,
        lng2: number,
      ): number {
        const deltaLat = lat2 - lat1;
        const deltaLng = lng2 - lng1;

        // pythagorean calculation of distance
        return Math.sqrt(deltaLat * deltaLat + deltaLng * deltaLng) * 364000;
      }

      const dirs = getWalkingDirections(pNodeZTs);

      // SKIPPER'S WACK AH CODE ENDS HERE
      //////////////////////////////////////////////////////////////////////////////////////

      return {
        path: returnPaths,
        directions: dirs,
      };
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
