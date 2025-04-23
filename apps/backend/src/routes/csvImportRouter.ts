import { initTRPC } from "@trpc/server";
import { z } from "zod";
import { parse } from "papaparse";
import PrismaClient from "../bin/prisma-client";
import { nodeType } from "database";

const t = initTRPC.create();

const CSVRecordSchema = z.object({
  "Building ID": z.string().optional(),
  "Building Name": z.string(),
  "Building Address": z.string(),
  "Building Phone": z.string(),
  "Location ID": z.string().optional(),
  Floor: z.string(),
  Suite: z.string().optional(),
  "Node ID": z.string().optional(),
  "Node Type": z.string(),
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
  if (!coord || coord.trim() === "") return null;

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

        return await PrismaClient.$transaction(async (tx) => {
          await tx.departmentServices.deleteMany({});
          await tx.service.deleteMany({});
          await tx.edge.deleteMany({});
          await tx.location.deleteMany({});
          await tx.node.deleteMany({});

          const buildingMapping = new Map<string, number>();
          const departmentMapping = new Map<string, number>();
          const nodeMapping = new Map<string, number>();
          const serviceMapping = new Map<string, number>();

          // Load and validate buildings from database
          const uniqueBuildings = new Set(
            validatedData.map((r) => r["Building Name"]),
          );
          for (const buildingName of uniqueBuildings) {
            const building = await tx.building.findFirst({
              where: { name: buildingName },
            });
            if (!building) {
              throw new Error(
                `Building "${buildingName}" not found in database.`,
              );
            }
            buildingMapping.set(buildingName, building.id);
          }

          // Load and validate departments from database
          const uniqueDepartments = new Set(
            validatedData
              .map((r) => r["Department Name"].trim())
              .filter((name) => name !== ""),
          );
          for (const departmentName of uniqueDepartments) {
            const department = await tx.department.findFirst({
              where: { name: departmentName },
            });
            if (!department) {
              throw new Error(
                `Department "${departmentName}" not found in database.`,
              );
            }
            departmentMapping.set(departmentName, department.id);
          }

          // Create unique services
          const uniqueServices = new Set<string>();
          for (const record of validatedData) {
            const services = record.Services.split(",")
              .map((s) => s.trim())
              .filter(Boolean);
            services.forEach((service) => uniqueServices.add(service));
          }

          for (const serviceName of uniqueServices) {
            const service = await tx.service.create({
              data: { name: serviceName },
            });
            serviceMapping.set(serviceName, service.id);
          }

          // Create nodes
          for (const record of validatedData) {
            const coords = parseCoordinates(record["Node Coordinates"]);
            if (coords) {
              const node = await tx.node.create({
                data: {
                  type: record["Node Type"] as nodeType,
                  description: record["Node Description"],
                  lat: coords.lat,
                  long: coords.long,
                },
              });
              nodeMapping.set(record["Node ID"] || String(node.id), node.id);
            }
          }

          // Create locations
          for (const record of validatedData) {
            const buildingId = buildingMapping.get(record["Building Name"]);
            const nodeId = nodeMapping.get(record["Node ID"] || "");
            const departmentId = departmentMapping.get(
              record["Department Name"],
            );

            if (buildingId) {
              await tx.location.create({
                data: {
                  buildingId,
                  floor: parseInt(record.Floor),
                  suite: record.Suite || null,
                  nodeID: nodeId || null,
                  departmentId: departmentId || null,
                },
              });
            }
          }

          // Create edges
          for (const record of validatedData) {
            const fromEdges = record["From Edges"]
              .split(",")
              .map((id) => id.trim())
              .filter(Boolean);

            const toEdges = record["To Edges"]
              .split(",")
              .map((id) => id.trim())
              .filter(Boolean);

            const currentNodeId = nodeMapping.get(record["Node ID"] || "");
            if (currentNodeId) {
              for (const toEdgeId of fromEdges) {
                const mappedToId = nodeMapping.get(toEdgeId);
                if (mappedToId) {
                  await tx.edge.create({
                    data: {
                      fromNodeId: currentNodeId,
                      toNodeId: mappedToId,
                    },
                  });
                }
              }

              for (const fromEdgeId of toEdges) {
                const mappedFromId = nodeMapping.get(fromEdgeId);
                if (mappedFromId) {
                  await tx.edge.create({
                    data: {
                      fromNodeId: mappedFromId,
                      toNodeId: currentNodeId,
                    },
                  });
                }
              }
            }
          }

          // Link departments and services
          const departmentServiceCombinations = [];
          for (const record of validatedData) {
            const departmentId = departmentMapping.get(
              record["Department Name"],
            );
            if (departmentId) {
              const services = record.Services.split(",")
                .map((s) => s.trim())
                .filter(Boolean);

              for (const serviceName of services) {
                const serviceId = serviceMapping.get(serviceName);
                if (serviceId) {
                  departmentServiceCombinations.push({
                    departmentID: departmentId,
                    serviceID: serviceId,
                  });
                }
              }
            }
          }

          if (departmentServiceCombinations.length > 0) {
            await tx.departmentServices.createMany({
              data: departmentServiceCombinations,
              skipDuplicates: true,
            });
          }

          return { success: true };
        });
      } catch (error) {
        console.error("Failed to import CSV:", error);
        throw error;
      }
    }),
});

export type CSVImportRouter = typeof csvImportRouter;
