import { t, adminProcedure } from "../trpc.ts";
import { z } from "zod";
import { unparse } from "papaparse";
import PrismaClient from "../bin/prisma-client";
import {
  Building,
  Location,
  Edge,
  DepartmentServices,
  nodeType,
} from "database";

const CSVRowSchema = z.object({
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
  "Node Outside": z.boolean(),
  "Node Coordinates": z.string(),
  "From Edges": z.string(),
  "To Edges": z.string(),
  "Department ID": z.string().optional(),
  "Department Name": z.string(),
  "Department Phone": z.string(),
  "Department Description": z.string().optional(),
  Services: z.string(),
});

type CSVRow = z.infer<typeof CSVRowSchema>;

type BuildingWithRelations = Building & {
  Location: (Location & {
    Department: {
      name: string;
      phoneNumber: string;
      description: string | null;
      DepartmentServices: (DepartmentServices & {
        service: {
          name: string;
        };
      })[];
    } | null;
    node: {
      type: string;
      description: string;
      lat: number;
      long: number;
      outside: boolean;
      fromEdge: Edge[];
      toEdge: Edge[];
    } | null;
  })[];
};

export const csvExportRouter = t.router({
  exportCSV: adminProcedure.query(async () => {
    try {
      const buildings = (await PrismaClient.building.findMany({
        include: {
          Location: {
            include: {
              Department: {
                include: {
                  DepartmentServices: {
                    include: {
                      service: true,
                    },
                  },
                },
              },
              node: {
                include: {
                  fromEdge: true,
                  toEdge: true,
                },
              },
            },
          },
        },
      })) as BuildingWithRelations[];

      const rows: CSVRow[] = buildings.flatMap((building) =>
        building.Location.map((location) => ({
          "Building ID": building.id?.toString() ?? "",
          "Building Name": building.name,
          "Building Address": building.address,
          "Building Phone": building.phoneNumber,
          "Location ID": location.id?.toString() ?? "",
          Floor: location.floor?.toString() ?? "0",
          Suite: location.suite ?? "",
          "Node ID": location.nodeID?.toString() ?? "",
          "Node Type": (location.node?.type as nodeType) ?? "Location",
          "Node Description": location.node?.description ?? "",
          "Node Outside": location.node?.outside ?? false,
          "Node Coordinates": location.node
            ? `${location.node.lat}, ${location.node.long}`
            : "",
          "From Edges":
            location.node?.fromEdge
              .map((edge) => edge.toNodeId)
              .filter(Boolean)
              .join(",") ?? "",
          "To Edges":
            location.node?.toEdge
              .map((edge) => edge.fromNodeId)
              .filter(Boolean)
              .join(",") ?? "",
          "Department ID": location.departmentId?.toString() ?? "",
          "Department Name": location.Department?.name ?? "",
          "Department Phone": location.Department?.phoneNumber ?? "",
          "Department Description": location.Department?.description ?? "",
          Services:
            location.Department?.DepartmentServices.map((ds) => ds.service.name)
              .filter(Boolean)
              .join(",") ?? "",
        })),
      );

      return unparse(rows, {
        header: true,
        columns: Object.keys(CSVRowSchema.shape),
      });
    } catch (error) {
      console.error("Failed to export CSV:", error);
      throw error;
    }
  }),
});

export type CSVExportRouter = typeof csvExportRouter;
