import { initTRPC } from "@trpc/server";
import { z } from "zod";
import { parse } from "papaparse";
import PrismaClient from "../../bin/prisma-client.ts";
import { nodeType } from "database";
import {csvSchema} from "../../../../../share/Schemas.ts";

const t = initTRPC.create();

type CSVRecord = z.infer<typeof csvSchema>;

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
          csvSchema.parse(record),
        );

        return await PrismaClient.$transaction(async (tx) => {
          await tx.departmentServices.deleteMany({});
          await tx.service.deleteMany({});
          await tx.edge.deleteMany({});
          await tx.location.deleteMany({});
          await tx.node.deleteMany({});
          await tx.department.deleteMany({});
          await tx.building.deleteMany({});

          const buildingMapping = new Map<string, number>();
          const nodeMapping = new Map<string, number>();
          const departmentMapping = new Map<string, number>();
          const serviceMapping = new Map<string, number>();

          const uniqueBuildings = new Map<string, CSVRecord>();
          for (const record of validatedData) {
            uniqueBuildings.set(record["Building Name"], record);
          }

          for (const [_, record] of uniqueBuildings) {
            let buildingId = 0;
            switch (record["Building Name"]) {
              case "Chestnut Hill":
              case "Chestnut Hill Medical Center":
                buildingId = 1;
                break;
              case "20 Patriot Place":
                buildingId = 2;
                break;
              case "22 Patriot Place":
                buildingId = 3;
                break;
              case "Faulkner Hospital":
                buildingId = 4;
                break;
            }

            const building = await tx.building.create({
              data: {
                id: buildingId,
                name: record["Building Name"],
                address: record["Building Address"],
                phoneNumber: record["Building Phone"],
              },
            });
            buildingMapping.set(record["Building Name"], building.id);
          }

          const uniqueDepartments = new Map<string, CSVRecord>();
          for (const record of validatedData) {
            uniqueDepartments.set(record["Department Name"], record);
          }

          for (const [_, record] of uniqueDepartments) {
            const department = await tx.department.create({
              data: {
                name: record["Department Name"],
                phoneNumber: record["Department Phone"],
                description: record["Department Description"] || null,
              },
            });
            departmentMapping.set(record["Department Name"], department.id);
          }

          const uniqueServices = new Set<string>();
          for (const record of validatedData) {
            const services = record.Services.split(",")
              .map((s) => s.trim())
              .filter(Boolean);
            services.forEach((service) => uniqueServices.add(service));
          }

          for (const serviceName of uniqueServices) {
            const service = await tx.service.create({
              data: {
                name: serviceName,
              },
            });
            serviceMapping.set(serviceName, service.id);
          }

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
