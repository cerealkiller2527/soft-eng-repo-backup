import { t, adminProcedure } from "../trpc.ts";
import { csvExportRouter } from "./csvExportRouter";
import { csvImportRouter } from "./csvImportRouter";
import PrismaClient from "../bin/prisma-client";

// Add clear database procedure
const clearDatabaseRouter = t.router({
  clearDatabase: adminProcedure.mutation(async () => {
    try {
      // Delete in correct order to handle foreign key constraints
      await PrismaClient.departmentServices.deleteMany();
      await PrismaClient.service.deleteMany();
      await PrismaClient.edge.deleteMany();
      await PrismaClient.location.deleteMany();
      await PrismaClient.department.deleteMany();
      await PrismaClient.building.deleteMany();
      await PrismaClient.node.deleteMany();
      return { message: "Database cleared successfully" };
    } catch (error) {
      throw new Error("Failed to clear database");
    }
  }),
});

// Combine all routers
export const csvRouter = t.mergeRouters(
  csvExportRouter,
  csvImportRouter,
  clearDatabaseRouter,
);
