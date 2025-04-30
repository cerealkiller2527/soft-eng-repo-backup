// src/routes/mapEditorRouter.ts
import { t, adminProcedure } from "../trpc.ts";
import { z } from "zod";
import PrismaClient from "../bin/prisma-client";
import prismaClient from "../bin/prisma-client";
import { TRPCError } from "@trpc/server";
import { NodeTypeZod } from "common/src/ZodSchemas.ts";

const node = z.object({ id: z.number() });
const typeEnum = NodeTypeZod;

export const mapEditorRouter = t.router({
  getFloorMap: adminProcedure
    .input(z.object({ buildingId: z.number(), floor: z.number() }))
    .query(async ({ input }) => {
      const locations = await getLocations(input);
      const validLocations = locations.filter((loc) => loc.node !== null);
      const nodes = validLocations.map((loc) => loc.node!);
      const nodeIds = nodes.map((n) => n.id);

      const edges = await PrismaClient.edge.findMany({
        where: { fromNodeId: { in: nodeIds }, toNodeId: { in: nodeIds } },
        orderBy: { id: "asc" },
      });

      // Get all departments to provide department data
      const departments = await PrismaClient.department.findMany({
        select: { id: true, name: true },
      });

      const formattedNodes = validLocations.map((loc) => {
        const node = loc.node!;
        return {
          id: node.id,
          x: node.lat,
          y: node.long,
          outside: node.outside,
          description: node.description,
          type: node.type,
          suite: loc.suite,
          departmentId: loc.departmentId ?? undefined,
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

      return {
        nodes: formattedNodes,
        edges: formattedEdges,
        departments: departments,
        buildingId: input.buildingId,
        floor: input.floor,
      };
    }),

  getDepartmentsByBuildingAndFloor: adminProcedure
    .input(z.object({ buildingId: z.number(), floor: z.number() }))
    .query(async ({ input }) => {
      // Return all departments instead of filtering by existing locations
      const departments = await PrismaClient.department.findMany({
        select: { id: true, name: true },
      });

      console.log(
        `Found ${departments.length} departments for building ID: ${input.buildingId}, floor: ${input.floor}`,
      );
      departments.forEach((dept) =>
        console.log(`Department: ${dept.name} (ID: ${dept.id})`),
      );

      return departments;
    }),

  sendFloorMap: adminProcedure
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
            outside: z.boolean(),
            departmentId: z.number().optional(),
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
      const location = { buildingId, floor };

      const nodesToDelete = await getNodesFromLocation(location);
      const nodeIds = nodesToDelete.map((n) => n.id);

      await prismaClient.edge.deleteMany({
        where: {
          OR: [{ fromNodeId: { in: nodeIds } }, { toNodeId: { in: nodeIds } }],
        },
      });

      await prismaClient.location.deleteMany({
        where: {
          buildingId,
          floor,
          nodeID: { in: nodeIds },
        },
      });

      await prismaClient.node.deleteMany({
        where: { id: { in: nodeIds } },
      });

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
              outside: node?.outside ?? false,
            },
          });

          let validatedDepartmentId: number | null = null;

          if (parsedType === "Location" && node.departmentId) {
            const matchingDept = await prismaClient.department.findUnique({
              where: {
                id: node.departmentId,
              },
            });

            if (matchingDept) {
              validatedDepartmentId = matchingDept.id;
              console.log(
                `Found department: ${matchingDept.name} (ID: ${matchingDept.id}) for node ID: ${node.id}`,
              );
            } else {
              console.log(
                `Department with ID ${node.departmentId} not found for node ID: ${node.id}`,
              );
            }
          }

          console.log(
            `Creating location with departmentId: ${validatedDepartmentId} for node type: ${parsedType}`,
          );

          await prismaClient.location.create({
            data: {
              floor,
              buildingId,
              nodeID: createdNode.id,
              suite: node.suite,
              departmentId: validatedDepartmentId,
            },
          });

          idMapping.push([node.id, createdNode.id]);

          if (parsedType === "Staircase" || parsedType === "Elevator") {
            const nearby = await prismaClient.node.findMany({
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

            for (const otherNode of nearby) {
              const exists = await prismaClient.edge.findFirst({
                where: {
                  OR: [
                    { fromNodeId: createdNode.id, toNodeId: otherNode.id },
                    { fromNodeId: otherNode.id, toNodeId: createdNode.id },
                  ],
                },
              });

              if (!exists) {
                await prismaClient.edge.createMany({
                  data: [
                    { fromNodeId: createdNode.id, toNodeId: otherNode.id },
                    { fromNodeId: otherNode.id, toNodeId: createdNode.id },
                  ],
                });
              }
            }
          }
        }),
      );

      await Promise.all(
        edges.map((edge) => {
          const fromMapped =
            idMapping.find(([id]) => id === edge.fromNodeId)?.[1] ??
            edge.fromNodeId;
          const toMapped =
            idMapping.find(([id]) => id === edge.toNodeId)?.[1] ??
            edge.toNodeId;

          return prismaClient.edge.create({
            data: { fromNodeId: fromMapped, toNodeId: toMapped },
          });
        }),
      );

      return { success: true };
    }),
});

async function getLocations({
  buildingId,
  floor,
}: {
  buildingId: number;
  floor: number;
}) {
  return await PrismaClient.location.findMany({
    where: { buildingId, floor },
    include: { node: true },
  });
}

async function getNodesFromLocation({
  buildingId,
  floor,
}: {
  buildingId: number;
  floor: number;
}) {
  const locations = await PrismaClient.location.findMany({
    where: { buildingId, floor },
    include: { node: true },
  });
  return locations.filter((l) => l.node !== null).map((l) => l.node!);
}

export type MapEditorRouter = typeof mapEditorRouter;
