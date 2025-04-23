// src/routes/mapEditorRouter.ts
import { initTRPC, TRPCError } from "@trpc/server";
import { z } from "zod";
import PrismaClient from "../bin/prisma-client";
import prismaClient from "../bin/prisma-client";

// Initialize tRPC
export const t = initTRPC.create();

// create zod objects for node and edge
const node = z.object({
  id: z.number(),
});

const typeEnum = z.enum([
  "Entrance",
  "Intermediary",
  "Staircase",
  "Elevator",
  "Location",
  "Help_Desk",
]);

export const mapEditorRouter = t.router({
  // Get all nodes and edges for a floor map in a single call
  getFloorMap: t.procedure
    .input(
      z.object({
        buildingId: z.number(),
        floor: z.number(),
      }),
    )
    .query(async ({ input }) => {
      try {
        const locations = await getLocations(input);

        const validLocations = locations.filter(
          (location) => location.node !== null,
        );

        const nodes = validLocations.map((location) => location.node!);
        const nodeIds = nodes.map((node) => node.id);

        const edges = await PrismaClient.edge.findMany({
          where: {
            fromNodeId: { in: nodeIds },
            toNodeId: { in: nodeIds },
          },
          orderBy: {
            id: "asc",
          },
        });

        const formattedNodes = validLocations.map((location) => {
          const node = location.node!;
          return {
            id: node.id,
            x: node.lat,
            y: node.long,
            description: node.description,
            type: node.type,
            suite: location.suite,
          };
        });

        const formattedEdges = edges.map((edge) => {
          const fromNode = nodes.find((n) => n.id === edge.fromNodeId);
          const toNode = nodes.find((n) => n.id === edge.toNodeId);

          return {
            id: edge.id,
            fromNodeId: edge.fromNodeId,
            toNodeId: edge.toNodeId,
            fromX: fromNode?.lat || 0,
            fromY: fromNode?.long || 0,
            toX: toNode?.lat || 0,
            toY: toNode?.long || 0,
          };
        });

        console.log(input.floor);

        return {
          nodes: formattedNodes,
          edges: formattedEdges,
          buildingId: input.buildingId,
          floor: input.floor,
        };
      } catch (error) {
        console.error("Error fetching floor map:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch floor map",
        });
      }
    }),

  sendFloorMap: t.procedure
    .input(
      z.object({
        buildingId: z.number(),
        floor: z.number(),
        nodes: z.array(
          z.object({
            id: z.number(),
            description: z.string(),
            longitude: z.number(),
            latitude: z.number(),
            type: z.string(),
            suite: z.string(),
          }),
        ),
        edges: z.array(
          z.object({
            fromNodeId: z.number(),
            toNodeId: z.number(),
          }),
        ),
      }),
    )
    .mutation(async ({ input }) => {
      const { buildingId, floor, nodes, edges } = input;
      console.log(floor);
      try {
        // get locations of nodes to delete

        // get nodes to delete from locations
        const location = { buildingId: input.buildingId, floor: input.floor };
        const nodesSecond = await getNodesFromLocation(location);
        const nodeIds = nodesSecond.map((node) => node.id);
        console.log(nodeIds);

        await prismaClient.edge.deleteMany({
          where: {
            OR: [
              { fromNodeId: { in: nodeIds } },
              { toNodeId: { in: nodeIds } },
            ],
          },
        });
        // delete nodes
        const deletedNodesCount = await prismaClient.node.deleteMany({
          where: {
            id: {
              in: nodeIds,
            },
          },
        });
        console.log(
          "Deleted ",
          deletedNodesCount.count,
          " nodes from the database",
        );

        const locations = await PrismaClient.location.deleteMany({
          where: {
            buildingId: input.buildingId,
            floor: input.floor,
            departmentId: null,
          },
        });
        console.log(
          "Deleted ",
          locations.count,
          " locations from the database",
        );

        // create nodes in database

        const idMapping: [number, number][] = [];

        const proximityThreshold = 0.0001;

        await Promise.all(
          nodes.map(async (node) => {
            const parsedType = typeEnum.parse(node.type);

            const createdNode = await prismaClient.node.create({
              data: {
                description: node.description,
                lat: node.latitude,
                long: node.longitude,
                type: parsedType,
              },
            });

            await prismaClient.location.create({
              data: {
                floor: floor,
                buildingId: buildingId,
                nodeID: createdNode.id,
                suite: node.suite,
              },
            });

            idMapping.push([node.id, createdNode.id]);

            if (parsedType === "Staircase" || parsedType === "Elevator") {
              // Query DB for existing nearby nodes of the same type
              const nearbySameTypeNodes = await prismaClient.node.findMany({
                where: {
                  type: parsedType,
                  NOT: { id: createdNode.id },
                  lat: {
                    gte: createdNode.lat - proximityThreshold,
                    lte: createdNode.lat + proximityThreshold,
                  },
                  long: {
                    gte: createdNode.long - proximityThreshold,
                    lte: createdNode.long + proximityThreshold,
                  },
                },
              });

              for (const otherNode of nearbySameTypeNodes) {
                // Check if edge already exists (in either direction)
                const existingEdge = await prismaClient.edge.findFirst({
                  where: {
                    OR: [
                      {
                        fromNodeId: createdNode.id,
                        toNodeId: otherNode.id,
                      },
                      {
                        fromNodeId: otherNode.id,
                        toNodeId: createdNode.id,
                      },
                    ],
                  },
                });

                if (!existingEdge) {
                  await prismaClient.edge.create({
                    data: {
                      fromNodeId: createdNode.id,
                      toNodeId: otherNode.id,
                    },
                  });

                  await prismaClient.edge.create({
                    data: {
                      fromNodeId: otherNode.id,
                      toNodeId: createdNode.id,
                    },
                  });

                  console.log(
                    `Edge created between ${createdNode.id} and ${otherNode.id}`,
                  );
                }
              }
            }

            return createdNode;
          }),
        );

        console.log("Created ", nodes.length, " nodes in the database");
        //make node creation/mapping for neg ids
        //if from or to node in edge is negative, use lookuptable to map to new id
        //create edges in database
        await Promise.all(
          edges.map((edge) => {
            const fromNodeEntry = idMapping.find(
              ([frontendID]) => frontendID === edge.fromNodeId,
            );
            const toNodeEntry = idMapping.find(
              ([frontendID]) => frontendID === edge.toNodeId,
            );

            const fromNodeId = fromNodeEntry
              ? fromNodeEntry[1]
              : edge.fromNodeId;
            const toNodeId = toNodeEntry ? toNodeEntry[1] : edge.toNodeId;

            return prismaClient.edge.create({
              data: {
                fromNodeId: fromNodeId,
                toNodeId: toNodeId,
              },
            });
          }),
        );
        return { success: true };
      } catch (error) {
        console.error("Error adding nodes from map editor: ", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to update floor map in database",
        });
      }
    }),
});

async function getLocations({
  buildingId,
  floor,
}: {
  buildingId: number;
  floor: number;
}) {
  // Get all nodes on this floor
  const locations = await PrismaClient.location.findMany({
    where: {
      buildingId: buildingId,
      floor: floor,
    },
    include: {
      node: true,
    },
  });
  // get the nodes at that location
  return locations.filter((location) => location.node !== null);
}

async function getNodesFromLocation({
  buildingId,
  floor,
}: {
  buildingId: number;
  floor: number;
}) {
  // Get all nodes on this floor
  const locations = await PrismaClient.location.findMany({
    where: {
      buildingId: buildingId,
      floor: floor,
    },
    include: {
      node: true,
    },
  });
  // get the nodes at that location
  return locations
    .filter((location) => location.node !== null)
    .map((location) => location.node!);
}

export type MapEditorRouter = typeof mapEditorRouter;
