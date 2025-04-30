import { Algorithm } from "./Algorithm.ts";
import { pNode } from "./pNode.ts";
import PrismaClient from "../../bin/prisma-client.ts";
import { z } from "zod";
import { pNodeZod, searchOutput } from "common/src/ZodSchemas.ts";

export class SearchSystem {
  algorithm: Algorithm;

  constructor(algorithm: Algorithm) {
    this.algorithm = algorithm;
  }

  changeAlgorithm(algorithm: Algorithm) {
    this.algorithm = algorithm;
  }

  async path(
    dropOffLatitude: number,
    dropOffLongitude: number,
    endNodeId: number,
    buildingId: number,
    driving: boolean,
  ) {
    let toParking = null;
    let toParkingZ = null;
    let startId = await this.findStartNodeId(
      dropOffLatitude,
      dropOffLongitude,
      false,
    );

    // if driving, create path to parking lot and update start node to be in parking lot
    if (driving) {
      const parkingNodeId = await this.findStartNodeId(
        dropOffLatitude,
        dropOffLongitude,
        true,
      );
      toParking = await this.algorithm.findPath(startId, parkingNodeId);
      startId = parkingNodeId;
    }

    // create path from start node to end node
    const toDepartment = await this.algorithm.findPath(startId, endNodeId);

    // convert pNode[] to z.array(pNodeZod)

    if (toParking) {
      const parkingPathIds = toParking.map((node) => node.id);
      const parkingFloorMap = await this.getFloorMap(parkingPathIds);
      toParkingZ = this.nodesToZods(toParking, parkingFloorMap);
    }

    const pathIds = toDepartment.map((node) => node.id);
    const floorMap = await this.getFloorMap(pathIds);
    const toDeptartmentZ = this.nodesToZods(toDepartment, floorMap);

    const output = {
      toParking: toParkingZ,
      toDepartment: toDeptartmentZ,
    };

    return searchOutput.parse(output);
  }

  private async findStartNodeId(
    dropOffLatitude: number,
    dropOffLongitude: number,
    parking: boolean,
  ) {
    let closestNode = null;
    let closestDist = Infinity;
    let outsideNodes = null;

    if (!parking) {
      outsideNodes = await PrismaClient.node.findMany({
        where: {
          outside: true,
        },
      });
    } else {
      outsideNodes = await PrismaClient.node.findMany({
        where: {
          type: "Parking",
        },
      });
    }

    for (const node of outsideNodes) {
      const dist = this.distance(
        node.lat,
        node.long,
        dropOffLatitude,
        dropOffLongitude,
      );
      if (dist < closestDist) {
        closestDist = dist;
        closestNode = node;
      }
    }

    return closestNode!.id;
  }

  private distance(
    nLat: number,
    nLong: number,
    dropLat: number,
    dropLong: number,
  ) {
    const dLa = nLat - dropLat;
    const dLn = nLong - dropLong;
    return dLa * dLa + dLn * dLn;
  }

  private nodesToZods(nodes: pNode[], floorMap: Map<number, number>) {
    const pNodeZodObjects = nodes.map((node) => ({
      id: node.id,
      description: node.description,
      longitude: node.longitude,
      latitude: node.latitude,
      floor: floorMap.get(node.id) ?? -1,
      neighbors: node.neighbors.map((neighbor) => ({
        id: neighbor.id,
      })),
    }));

    return z.array(pNodeZod).parse(pNodeZodObjects);
  }

  // this is to get the floor of each node because we decided nodes dont need that attr anymore so now i have to do a bunch of lookups
  private async getFloorMap(pathIds: number[]) {
    const locations = await PrismaClient.location.findMany({
      where: {
        nodeID: { in: pathIds },
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

    return floorMap;
  }
}
