import { initTRPC } from "@trpc/server";
import { z } from "zod";
import { unparse } from "papaparse";
import PrismaClient from "../../bin/prisma-client.ts";
import {
  Building,
  Location,
  Edge,
  DepartmentServices,
  nodeType,
} from "database";
import {csvSchema} from "../../../../../share/Schemas.ts";

const t = initTRPC.create();



type CSVRow = z.infer<typeof csvSchema>;

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
      fromEdge: Edge[];
      toEdge: Edge[];
    } | null;
  })[];
};

export const csvExportRouter = t.router({
  exportCSV: t.procedure.query(async () => {
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
        columns: Object.keys(csvSchema.shape),
      });
    } catch (error) {
      console.error("Failed to export CSV:", error);
      throw error;
    }
  }),
});

export type CSVExportRouter = typeof csvExportRouter;
