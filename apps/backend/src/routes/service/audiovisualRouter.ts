import { t, protectedProcedure } from "../../trpc.ts";
import { ServiceRequest, RequestType, Status, Priority } from "database";
import PrismaClient from "../../bin/prisma-client.ts";
import { z } from "zod";

export const audiovisualRouter = t.router({
  getAudioVisualRequests: protectedProcedure
    .input(
      z.object({
        location: z.string().optional(),
        deadline: z.coerce.date().optional(),
        audiovisualType: z.string().optional(),
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
        deadline,
        audiovisualType,
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
              type: RequestType.AUDIOVISUAL,
              ...(location && { audiovisual: { location: location } }),
              ...(deadline && { audioVisual: { deadline: deadline } }),
              ...(username && { assignedTo: { username: username } }),
              ...(audiovisualType && {
                audioVisual: { audiovisualType: audiovisualType },
              }),
              ...(additionalNotes && { additionalNotes: additionalNotes }),
              ...(priority && { priority: priority as Priority }),
              ...(status && { status: status as Status }),
            },
            include: {
              audioVisual: true,
              assignedTo: true,
              fromEmployee: true,
            },
          });
        } else {
          return PrismaClient.serviceRequest.findMany({
            where: {
              type: RequestType.AUDIOVISUAL,
              ...(location && { audiovisual: { location: location } }),
              ...(deadline && { audioVisual: { deadline: deadline } }),
              ...(username && { fromEmployee: { username: username } }),
              ...(audiovisualType && {
                audioVisual: { audiovisualType: audiovisualType },
              }),
              ...(additionalNotes && { additionalNotes: additionalNotes }),
              ...(priority && { priority: priority as Priority }),
              ...(status && { status: status as Status }),
            },
            include: {
              audioVisual: true,
              assignedTo: true,
              fromEmployee: true,
            },
          });
        }
      } else {
        if (assigned) {
          return PrismaClient.serviceRequest.findMany({
            where: {
              type: RequestType.AUDIOVISUAL,
              ...(location && { audiovisual: { location: location } }),
              ...(deadline && { audioVisual: { deadline: deadline } }),
              ...(audiovisualType && {
                audioVisual: { audiovisualType: audiovisualType },
              }),
              ...(additionalNotes && { additionalNotes: additionalNotes }),
              ...(priority && { priority: priority as Priority }),
              ...(status && { status: status as Status }),
              assignedTo: { username: ctx.username ?? undefined },
            },
            include: {
              audioVisual: true,
              assignedTo: true,
              fromEmployee: true,
            },
          });
        } else {
          return PrismaClient.serviceRequest.findMany({
            where: {
              type: RequestType.AUDIOVISUAL,
              ...(location && { audiovisual: { location: location } }),
              ...(deadline && { audioVisual: { deadline: deadline } }),
              ...(audiovisualType && {
                audioVisual: { audiovisualType: audiovisualType },
              }),
              ...(additionalNotes && { additionalNotes: additionalNotes }),
              ...(priority && { priority: priority as Priority }),
              ...(status && { status: status as Status }),
              fromEmployee: { username: ctx.username ?? undefined },
            },
            include: {
              audioVisual: true,
              assignedTo: true,
              fromEmployee: true,
            },
          });
        }
      }
    }),

  addAudioVisualRequest: protectedProcedure
    .input(
      z.object({
        location: z.string(),
        deadline: z.coerce.date(),
        audiovisualType: z.string(),
        additionalNotes: z.string(),
        priority: z.nativeEnum(Priority),
        employeeID: z.number().optional(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const {
        location,
        deadline,
        audiovisualType,
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
          type: RequestType.AUDIOVISUAL,
          dateCreated: new Date(Date.now()),
          status: status,
          description: additionalNotes,
          fromEmployeeID: employee.id,
          priority: priority as Priority,
          ...(employeeID && { assignedEmployeeID: employeeID }),
        },
      });
      await PrismaClient.audioVisual.create({
        data: {
          id: serviceRequest.id,
          location: location,
          deadline: deadline,
          audiovisualType: audiovisualType,
        },
      });
      console.log("Create audiovisual request done.");
      return {
        message: "Create audiovisual request done.",
      };
    }),

  updateAudioVisualRequest: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        location: z.string().optional(),
        deadline: z.coerce.date().optional(),
        audiovisualType: z.string().optional(),
        additionalNotes: z.string().optional(),
        priority: z.nativeEnum(Priority).optional(),
        employeeID: z.number().optional(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const {
        id,
        location,
        deadline,
        audiovisualType,
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
            ...(location || deadline || audiovisualType
              ? {
                  audioVisual: {
                    update: {
                      ...(location && { location: location }),
                      ...(deadline && { deadline: deadline }),
                      ...(audiovisualType && {
                        audioVisualType: audiovisualType,
                      }),
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
            ...(location || deadline || audiovisualType
              ? {
                  audioVisual: {
                    update: {
                      ...(location && { location: location }),
                      ...(deadline && { deadline: deadline }),
                      ...(audiovisualType && {
                        audioVisualType: audiovisualType,
                      }),
                    },
                  },
                }
              : {}),
          },
        });
      }

      console.log("Update audiovisual request done.");
      return {
        message: "Update audiovisual request done.",
      };
    }),
  deleteAudioVisualRequest: protectedProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      await PrismaClient.serviceRequest.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
