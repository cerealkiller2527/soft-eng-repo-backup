import { t, protectedProcedure } from "../../trpc.ts";
import { ServiceRequest, RequestType, Status, Priority } from "database";
import PrismaClient from "../../bin/prisma-client.ts";
import { z } from "zod";

export const languageRouter = t.router({
  getLanguageRequests: protectedProcedure
    .input(
      z.object({
        language: z.string().optional(),
        location: z.string().optional(),
        startTime: z.coerce.date().optional(),
        endTime: z.coerce.date().optional(),
        additionalNotes: z.string().optional(),
        priority: z.nativeEnum(Priority).optional(),
        status: z.nativeEnum(Status).optional(),
        username: z.string().optional(),
        assigned: z.boolean(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const {
        language,
        location,
        startTime,
        endTime,
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
              type: RequestType.LANGUAGE,
              ...(language && { language: { language: language } }),
              ...(location && { language: { location: location } }),
              ...(startTime && { language: { startTime: startTime } }),
              ...(endTime && { language: { endTime: endTime } }),
              ...(additionalNotes && { additionalNotes: additionalNotes }),
              ...(priority && { priority: priority as Priority }),
              ...(status && { status: status as Status }),
              ...(username && { assignedTo: { username: username } }),
            },
            include: {
              language: true,
              assignedTo: true,
              fromEmployee: true,
            },
          });
        } else {
          return PrismaClient.serviceRequest.findMany({
            where: {
              type: RequestType.LANGUAGE,
              ...(language && { language: { language: language } }),
              ...(location && { language: { location: location } }),
              ...(startTime && { language: { startTime: startTime } }),
              ...(endTime && { language: { endTime: endTime } }),
              ...(additionalNotes && { additionalNotes: additionalNotes }),
              ...(priority && { priority: priority as Priority }),
              ...(status && { status: status as Status }),
              ...(username && { fromEmployee: { username: username } }),
            },
            include: {
              language: true,
              assignedTo: true,
              fromEmployee: true,
            },
          });
        }
      } else {
        if (assigned) {
          return PrismaClient.serviceRequest.findMany({
            where: {
              type: RequestType.LANGUAGE,
              ...(language && { language: { language: language } }),
              ...(location && { language: { location: location } }),
              ...(startTime && { language: { startTime: startTime } }),
              ...(endTime && { language: { endTime: endTime } }),
              ...(additionalNotes && { additionalNotes: additionalNotes }),
              ...(priority && { priority: priority as Priority }),
              ...(status && { status: status as Status }),
              assignedTo: { username: ctx.username ?? undefined },
            },
            include: {
              language: true,
              assignedTo: true,
              fromEmployee: true,
            },
          });
        } else {
          return PrismaClient.serviceRequest.findMany({
            where: {
              type: RequestType.LANGUAGE,
              ...(language && { language: { language: language } }),
              ...(location && { language: { location: location } }),
              ...(startTime && { language: { startTime: startTime } }),
              ...(endTime && { language: { endTime: endTime } }),
              ...(additionalNotes && { additionalNotes: additionalNotes }),
              ...(priority && { priority: priority as Priority }),
              ...(status && { status: status as Status }),
              fromEmployee: { username: ctx.username ?? undefined },
            },
            include: {
              language: true,
              assignedTo: true,
              fromEmployee: true,
            },
          });
        }
      }
    }),

  addLanguageRequest: protectedProcedure
    .input(
      z.object({
        language: z.string(),
        location: z.string(),
        startTime: z.coerce.date(),
        endTime: z.coerce.date(),
        additionalNotes: z.string(),
        priority: z.nativeEnum(Priority),
        employeeID: z.number().optional(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const {
        language,
        location,
        startTime,
        endTime,
        additionalNotes,
        priority,
        employeeID,
      } = input;
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
          type: RequestType.LANGUAGE,
          dateCreated: new Date(Date.now()),
          status: status,
          description: additionalNotes,
          fromEmployeeID: employee.id,
          priority: priority as Priority,
          ...(employeeID && { assignedEmployeeID: employeeID }),
        },
      });
      await PrismaClient.language.create({
        data: {
          id: serviceRequest.id,
          language: language,
          location: location,
          startTime: startTime,
          endTime: endTime,
        },
      });
      console.log("Create language request done.");
      return {
        message: "Create language request done.",
      };
    }),

  updateLanguageRequest: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        language: z.string().optional(),
        location: z.string().optional(),
        startTime: z.coerce.date().optional(),
        endTime: z.coerce.date().optional(),
        additionalNotes: z.string().optional(),
        priority: z.nativeEnum(Priority).optional(),
        employeeID: z.number().optional(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const {
        id,
        language,
        location,
        startTime,
        endTime,
        additionalNotes,
        priority,
        employeeID,
      } = input;
      if (ctx.role === "admin") {
        const serviceRequest = await PrismaClient.serviceRequest.update({
          where: { id: id },
          data: {
            ...(additionalNotes && { additionalNotes: additionalNotes }),
            ...(priority && { priority: priority as Priority }),
            ...(employeeID && { assignedEmployeeID: employeeID }),
            ...(language || location || startTime || endTime
              ? {
                  language: {
                    update: {
                      ...(language && { language: language }),
                      ...(location && { location: location }),
                      ...(startTime && { startTime: startTime }),
                      ...(endTime && { endTime: endTime }),
                    },
                  },
                }
              : {}),
          },
        });
      } else {
        const serviceRequest = await PrismaClient.serviceRequest.update({
          where: { id: id },
          data: {
            ...(additionalNotes && { additionalNotes: additionalNotes }),
            ...(priority && { priority: priority as Priority }),
            ...(language || location || startTime || endTime
              ? {
                  language: {
                    update: {
                      ...(language && { language: language }),
                      ...(location && { location: location }),
                      ...(startTime && { startTime: startTime }),
                      ...(endTime && { endTime: endTime }),
                    },
                  },
                }
              : {}),
          },
        });
      }

      console.log("Update language request done.");
      return {
        message: "Update language request done.",
      };
    }),
  deleteLanguageRequest: protectedProcedure
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
