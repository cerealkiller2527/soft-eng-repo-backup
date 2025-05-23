import { t, protectedProcedure } from "../../trpc.ts";
import { ServiceRequest, RequestType, Status, Priority } from "database";
import PrismaClient from "../../bin/prisma-client.ts";
import { z } from "zod";

export const securityRouter = t.router({
  getSecurityRequests: protectedProcedure
    .input(
      z.object({
        location: z.string().optional(),
        additionalNotes: z.string().optional(),
        priority: z.nativeEnum(Priority).optional(),
        status: z.nativeEnum(Status).optional(),
        username: z.string().optional(),
        assigned: z.boolean(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const {
        location,
        additionalNotes,
        priority,
        status,
        username,
        assigned,
      } = input;
      if (ctx.role === "admin") {
        if (assigned) {
          return PrismaClient.serviceRequest.findMany({
            where: {
              type: RequestType.SECURITY,
              ...(location && { security: { location: location } }),
              ...(additionalNotes && { additionalNotes: additionalNotes }),
              ...(priority && { priority: priority as Priority }),
              ...(status && { status: status as Status }),
              ...(username && { assignedTo: { username: username } }),
            },
            include: {
              security: true,
              assignedTo: true,
              fromEmployee: true,
            },
          });
        } else {
          return PrismaClient.serviceRequest.findMany({
            where: {
              type: RequestType.SECURITY,
              ...(location && { security: { location: location } }),
              ...(additionalNotes && { additionalNotes: additionalNotes }),
              ...(priority && { priority: priority as Priority }),
              ...(status && { status: status as Status }),
              ...(username && { fromEmployee: { username: username } }),
            },
            include: {
              security: true,
              assignedTo: true,
              fromEmployee: true,
            },
          });
        }
      } else {
        if (assigned) {
          return PrismaClient.serviceRequest.findMany({
            where: {
              type: RequestType.SECURITY,
              ...(location && { security: { location: location } }),
              ...(additionalNotes && { additionalNotes: additionalNotes }),
              ...(priority && { priority: priority as Priority }),
              ...(status && { status: status as Status }),
              assignedTo: { username: ctx.username ?? undefined },
            },
            include: {
              security: true,
              assignedTo: true,
              fromEmployee: true,
            },
          });
        } else {
          return PrismaClient.serviceRequest.findMany({
            where: {
              type: RequestType.SECURITY,
              ...(location && { security: { location: location } }),
              ...(additionalNotes && { additionalNotes: additionalNotes }),
              ...(priority && { priority: priority as Priority }),
              ...(status && { status: status as Status }),
              fromEmployee: { username: ctx.username ?? undefined },
            },
            include: {
              security: true,
              assignedTo: true,
              fromEmployee: true,
            },
          });
        }
      }
    }),

  addSecurityRequest: protectedProcedure
    .input(
      z.object({
        location: z.string(),
        additionalNotes: z.string(),
        priority: z.nativeEnum(Priority),
        employeeID: z.number().optional(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { location, additionalNotes, priority, employeeID } = input;
      let status: Status = Status.NOTASSIGNED;
      if (employeeID != undefined) {
        status = Status.ASSIGNED;
      }
      if (!ctx.username) {
        throw new Error("Username does not exist!");
      }
      const employee = await PrismaClient.employee.findUnique({
        where: {
          username: ctx.username,
        },
      });
      if (!employee) {
        throw new Error("Employee not found");
      }
      const serviceRequest = await PrismaClient.serviceRequest.create({
        data: {
          type: RequestType.SECURITY,
          dateCreated: new Date(Date.now()),
          status: status,
          description: additionalNotes,
          fromEmployeeID: employee.id,
          priority: priority as Priority,
          ...(employeeID && { assignedEmployeeID: employeeID }),
        },
      });
      console.log(serviceRequest.assignedEmployeeID);
      await PrismaClient.security.create({
        data: {
          id: serviceRequest.id,
          location: location,
        },
      });
      console.log("Create security request done.");
      return {
        message: "Create security request done.",
      };
    }),

  updateSecurityRequest: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        location: z.string().optional(),
        additionalNotes: z.string().optional(),
        priority: z.nativeEnum(Priority).optional(),
        employeeID: z.number().optional(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { id, location, additionalNotes, priority, employeeID } = input;
      if (ctx.role === "admin") {
        const serviceRequest = await PrismaClient.serviceRequest.update({
          where: { id: id },
          data: {
            ...(additionalNotes && { additionalNotes: additionalNotes }),
            ...(priority && { priority: priority as Priority }),
            ...(employeeID && { assignedEmployeeID: employeeID }),
            ...(location && { security: { update: { location } } }),
          },
        });
        console.log("Update security request done.");
        return {
          message: "Update security request done.",
        };
      } else {
        const serviceRequest = await PrismaClient.serviceRequest.update({
          where: { id: id },
          data: {
            ...(additionalNotes && { additionalNotes: additionalNotes }),
            ...(priority && { priority: priority as Priority }),
            ...(location && { security: { update: { location } } }),
          },
        });
        console.log("Update security request done.");
        return {
          message: "Update security request done.",
        };
      }
    }),
  deleteSecurityRequest: protectedProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      await PrismaClient.serviceRequest.delete({
        where: { id: input.id },
      });
    }),
});
