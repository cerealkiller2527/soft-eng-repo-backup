import { initTRPC, TRPCError } from "@trpc/server";
import { z } from "zod";
import { parse } from "papaparse";
import prisma from "../bin/prisma-client";

const t = initTRPC.create();

const nodeTypeEnum = z.enum([
  "Entrance",
  "Intermediary",
  "Staircase",
  "Elevator",
  "Location",
  "Help_Desk",
]);

const CSVRecordSchema = z.object({
  "Building ID": z.string().optional(),
  "Building Name": z.string(),
  "Building Address": z.string(),
  "Building Phone": z.string(),
  "Location ID": z.string().optional(),
  Floor: z.string(),
  Suite: z.string().optional(),
  "Node ID": z.string().optional(),
  "Node Type": nodeTypeEnum,
  "Node Description": z.string(),
  "Node Coordinates": z.string(),
  "From Edges": z.string(),
  "To Edges": z.string(),
  "Department ID": z.string().optional(),
  "Department Name": z.string(),
  "Department Phone": z.string(),
  "Department Description": z.string().optional(),
  Services: z.string(),
});

type CSVRecord = z.infer<typeof CSVRecordSchema>;

function parseCoordinates(coord: string): { lat: number; long: number } | null {
  if (!coord || coord.trim() === "") {
    return null;
  }

  const cleanCoord = coord.replace(/[()]/g, "").trim();
  const parts = cleanCoord.split(",").map((s) => s.trim());

  if (parts.length !== 2) {
    throw new Error('Invalid coordinate format: expected "lat, long"');
  }

  const [latStr, longStr] = parts;
  const lat = parseFloat(latStr);
  const long = parseFloat(longStr);

  if (isNaN(lat) || isNaN(long)) {
    throw new Error("Invalid coordinate values: could not parse numbers");
  }

  return { lat, long };
}

export const csvImportRouter = t.router({
  importCSV: t.procedure
    .input(z.object({ json: z.string() }))
    .mutation(async ({ input }) => {
      try {
        const { data } = parse(input.json, {
          header: true,
          skipEmptyLines: true,
        });

        const validatedData = data.map((record) =>
          CSVRecordSchema.parse(record),
        );

        for (const record of validatedData) {
          const building = await prisma.building.upsert({
            where: { id: parseInt(record["Building ID"] || "0") },
            update: {
              name: record["Building Name"],
              address: record["Building Address"],
              phoneNumber: record["Building Phone"],
            },
            create: {
              name: record["Building Name"],
              address: record["Building Address"],
              phoneNumber: record["Building Phone"],
            },
          });

          const location = await prisma.location.upsert({
            where: { id: parseInt(record["Location ID"] || "0") },
            update: {
              buildingId: building.id,
              floor: parseInt(record["Floor"]),
              suite: record["Suite"] || null,
            },
            create: {
              buildingId: building.id,
              floor: parseInt(record["Floor"]),
              suite: record["Suite"] || null,
            },
          });

          const coords = parseCoordinates(record["Node Coordinates"]);
          let nodeId: number | undefined;

          if (coords) {
            const node = await prisma.node.upsert({
              where: { id: parseInt(record["Node ID"] || "0") },
              update: {
                type: record["Node Type"],
                description: record["Node Description"],
                lat: coords.lat,
                long: coords.long,
              },
              create: {
                type: record["Node Type"],
                description: record["Node Description"],
                lat: coords.lat,
                long: coords.long,
              },
            });
            nodeId = node.id;
          }

          if (nodeId) {
            await prisma.location.update({
              where: { id: location.id },
              data: { nodeID: nodeId },
            });
          }

          const department = await prisma.department.upsert({
            where: { id: parseInt(record["Department ID"] || "0") },
            update: {
              name: record["Department Name"],
              phoneNumber: record["Department Phone"],
              description: record["Department Description"] || null,
            },
            create: {
              name: record["Department Name"],
              phoneNumber: record["Department Phone"],
              description: record["Department Description"] || null,
            },
          });

          await prisma.location.update({
            where: { id: location.id },
            data: { departmentId: department.id },
          });

          if (nodeId) {
            const fromEdges = record["From Edges"]
              .split(",")
              .map((id) => id.trim())
              .filter(Boolean);
            const toEdges = record["To Edges"]
              .split(",")
              .map((id) => id.trim())
              .filter(Boolean);

            // First ensure all referenced nodes exist
            const allReferencedNodeIds = [
              ...new Set([...fromEdges, ...toEdges]),
            ];
            const existingNodes = await prisma.node.findMany({
              where: {
                id: {
                  in: allReferencedNodeIds.map((id) => parseInt(id)),
                },
              },
              select: { id: true },
            });
            const existingNodeIds = new Set(
              existingNodes.map((node) => node.id.toString()),
            );

            // Only create edges for nodes that exist
            for (const toId of fromEdges) {
              if (existingNodeIds.has(toId)) {
                await prisma.edge.upsert({
                  where: {
                    id: parseInt(toId),
                  },
                  update: {
                    fromNodeId: nodeId,
                    toNodeId: parseInt(toId),
                  },
                  create: {
                    fromNodeId: nodeId,
                    toNodeId: parseInt(toId),
                  },
                });
              }
            }

            for (const fromId of toEdges) {
              if (existingNodeIds.has(fromId)) {
                await prisma.edge.upsert({
                  where: {
                    id: parseInt(fromId),
                  },
                  update: {
                    fromNodeId: parseInt(fromId),
                    toNodeId: nodeId,
                  },
                  create: {
                    fromNodeId: parseInt(fromId),
                    toNodeId: nodeId,
                  },
                });
              }
            }
          }
        }

        return { success: true };
      } catch (error) {
        if (error instanceof z.ZodError) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: error.errors[0].message,
          });
        }
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message:
            error instanceof Error ? error.message : "Failed to import CSV",
        });
      }
    }),
});

export type CSVImportRouter = typeof csvImportRouter;
