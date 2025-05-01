import { adminProcedure, t } from "../trpc.ts";
import { z } from "zod";
import PrismaClient from "../bin/prisma-client";

import {
  buildingCSVRow,
  departmentCSVRow,
  employeeCSVRow,
  nodeWithEdgesRow,
} from "database/src/CSVTypes.ts";

const CSVRecordSchema = z.object({
  "Building ID": z.string().optional(), // get rid of!
  "Building Name": z.string(),
  "Building Address": z.string(),
  "Building Phone": z.string(),
  "Location ID": z.string().optional(), // get rid of!
  Floor: z.string(),
  Suite: z.string().optional(),
  "Node ID": z.string().optional(), // get rid of!
  "Node Type": z.string(),
  "Node Description": z.string(),
  "Node Coordinates": z.string(),
  "Node Outside": z.string(),
  "From Edges": z.string(),
  "To Edges": z.string(),
  "Department ID": z.string().optional(), // get rid of!
  "Department Name": z.string(),
  "Department Phone": z.string(),
  "Department Description": z.string().optional(),
  Services: z.string(),
});

async function getEmployees(): Promise<z.infer<typeof employeeCSVRow>[]> {
  // get employee info (all)
  const employees = await PrismaClient.employee.findMany({
    where: {},
  });
  // map the employee prisma return to the csv row employee type
  return employees.map((employee) => {
    const parsedEmployees: z.infer<typeof employeeCSVRow> = {
      type: employee.employeeType,
      employee: employee.name,
      services: employee.canService.join(";"),
      languages: employee.language.join(";"),
    };
    return parsedEmployees;
  });
}

async function getBuildings(): Promise<z.infer<typeof buildingCSVRow>[]> {
  // get building info (all)
  const buildings = await PrismaClient.building.findMany({
    where: {},
  });
  // map the prisma return to the buildingCSVRow type
  return buildings.map((building) => {
    const myBuilding: z.infer<typeof buildingCSVRow> = {
      id: building.id,
      name: building.name,
      address: building.address,
      phoneNumber: building.phoneNumber,
    };
    return myBuilding;
  });
}

async function getDepartments(): Promise<z.infer<typeof departmentCSVRow>[]> {
  // get all the departments and include its services and location
  const departments = await PrismaClient.department.findMany({
    where: {},
    include: {
      DepartmentServices: {
        include: {
          service: true,
        },
      },
      Location: {
        include: {
          building: true,
        },
      },
    },
  });

  // map services to an array
  const myServices = departments.flatMap((department) => {
    return department.DepartmentServices.map((deptService) => {
      return deptService.service.name;
    });
  });

  return departments.map((department) => {
    const myDept: z.infer<typeof departmentCSVRow> = {
      name: department.name,
      services: myServices.join(";"),
      buildingName: department.Location[0].building.name,
      phoneNumber: department.phoneNumber,
      description: department.description ?? "",
      floor: department.Location[0].floor,
      suite: department.Location[0].suite ?? "",
    };
    return myDept;
  });
}

async function getNodesAndEdges(): Promise<z.infer<typeof nodeWithEdgesRow>[]> {
  // get all nodes and nodes that are its neighbors
  const nodes = await PrismaClient.node.findMany({
    where: {},
    include: {
      fromEdge: {
        include: {
          toNode: true,
        },
      },
      toEdge: {
        include: {
          fromNode: true,
        },
      },
      Location: {
        include: {
          building: true,
        },
      },
    },
  });

  return nodes.map((node) => {
    // get all nodes on the "toEdge" that are on the other side of this node (fromNodes)
    const toEdges = node.toEdge.map((thisToEdge) => {
      thisToEdge.fromNode.description;
    });
    // get all nodes on the "fromEdge" that are on the other side of this node (toNodes)
    const fromEdges = node.fromEdge.map((thisFromEdge) => {
      thisFromEdge.toNode.description;
    });

    const myNodeWithEdges: z.infer<typeof nodeWithEdgesRow> = {
      description: node.description,
      building: node.Location[0].building.name,
      floor: node.Location[0].floor,
      type: node.type,
      lat: node.lat,
      long: node.long,
      outside: node.outside,
      edges: [...toEdges, ...fromEdges].join(";"),
    };
    return myNodeWithEdges;
  });
}

export const dbImportRouter = t.router({
  dbImport: adminProcedure.query(async () => {
    try {
      const parsedEmployees = await getEmployees();
      const parsedBuildings = await getBuildings();
      const parsedDepartments = await getDepartments();
      const parsedNodesWithEdges = await getNodesAndEdges();

      // // buildings with info
      // const buildings = (await PrismaClient.building.findMany({
      //   include: {
      //     Location: {
      //       include: {
      //         Department: {
      //           include: {
      //             DepartmentServices: {
      //               include: {
      //                 service: true,
      //               },
      //             },
      //           },
      //         },
      //         node: {
      //           include: {
      //             fromEdge: true,
      //             toEdge: true,
      //           },
      //         },
      //       },
      //     },
      //   },
      // }))

      // const rows: z.infer<typeof CSVRecordSchema>[] = buildings.map(building => {
      //
      //   const myRow: z.infer<typeof CSVRecordSchema> = {
      //     // "Building ID":
      //     "Building Name": building.name,
      //     "Building Address": building.address,
      //     "Building Phone": building.phoneNumber,
      //     // "Location ID": z.string().optional(), // get rid of!
      //     Floor: building.Location[0].floor,
      //     Suite: building.Location[0].suite,
      //     // "Node ID": z.string().optional(), // get rid of!
      //     "Node Type": z.string(),
      //     "Node Description": z.string(),
      //     "Node Coordinates": z.string(),
      //     "Node Outside": z.string(),
      //     "From Edges": z.string(),
      //     "To Edges": z.string(),
      //     // "Department ID": z.string().optional(), // get rid of!
      //     "Department Name": z.string(),
      //     "Department Phone": z.string(),
      //     "Department Description": z.string().optional(),
      //     Services: z.string(),
      //   }
      //
      //   return myRow;
      // })

      // const rows: CSVRow[] = buildings.flatMap((building) =>
      //   building.Location.map((location) => ({
      //     "Building ID": building.id?.toString() ?? "",
      //     "Building Name": building.name,
      //     "Building Address": building.address,
      //     "Building Phone": building.phoneNumber,
      //     "Location ID": location.id?.toString() ?? "",
      //     Floor: location.floor?.toString() ?? "0",
      //     Suite: location.suite ?? "",
      //     "Node ID": location.nodeID?.toString() ?? "",
      //     "Node Type": (location.node?.type as nodeType) ?? "Location",
      //     "Node Description": location.node?.description ?? "",
      //     "Node Outside": location.node?.outside ?? false,
      //     "Node Coordinates": location.node
      //       ? `${location.node.lat}, ${location.node.long}`
      //       : "",
      //     "From Edges":
      //       location.node?.fromEdge
      //         .map((edge) => edge.toNodeId)
      //         .filter(Boolean)
      //         .join(",") ?? "",
      //     "To Edges":
      //       location.node?.toEdge
      //         .map((edge) => edge.fromNodeId)
      //         .filter(Boolean)
      //         .join(",") ?? "",
      //     "Department ID": location.departmentId?.toString() ?? "",
      //     "Department Name": location.Department?.name ?? "",
      //     "Department Phone": location.Department?.phoneNumber ?? "",
      //     "Department Description": location.Department?.description ?? "",
      //     Services:
      //       location.Department?.DepartmentServices.map((ds) => ds.service.name)
      //         .filter(Boolean)
      //         .join(",") ?? "",
      //   })),
      // );
    } catch (error) {
      console.error("Failed to export CSV:", error);
      throw error;
    }
  }),
});

export type DBImportRouter = typeof dbImportRouter;
