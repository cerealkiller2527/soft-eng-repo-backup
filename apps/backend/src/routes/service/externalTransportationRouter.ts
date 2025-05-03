import { t, protectedProcedure } from "../../trpc.ts";
import { ServiceRequest, RequestType, Status, Priority } from "database";
import PrismaClient from "../../bin/prisma-client.ts";
import { z } from "zod";

export const externalTransportationRouter = t.router({
  getExternalTransportationRequests: protectedProcedure
    .input(
      z.object({
        patientName: z.string().optional(),
        pickupTime: z.coerce.date().optional(),
        transportation: z.string().optional(),
        pickupTransport: z.string().optional(),
        dropoffTransport: z.string().optional(),
        additionalNotes: z.string().optional(),
        priority: z.nativeEnum(Priority).optional(),
        status: z.nativeEnum(Status).optional(),
        username: z.string().optional(),
        assigned: z.boolean(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const {
        patientName,
        pickupTime,
        transportation,
        pickupTransport,
        dropoffTransport,
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
              ...(username && { assignedTo: { username: username } }),
              type: RequestType.EXTERNALTRANSPORTATION,
              ...(patientName && {
                externalTransportation: { patientName: patientName },
              }),
              ...(pickupTime && {
                externalTransportation: { pickupTime: pickupTime },
              }),
              ...(transportation && {
                externalTransportation: { transportType: transportation },
              }),
              ...(pickupTransport && {
                externalTransportation: { fromWhere: pickupTransport },
              }),
              ...(dropoffTransport && {
                externalTransportation: { toWhere: dropoffTransport },
              }),
              ...(additionalNotes && { additionalNotes: additionalNotes }),
              ...(priority && { priority: priority as Priority }),
              ...(status && { status: status as Status }),
            },
            include: {
              externalTransportation: true,
              assignedTo: true,
              fromEmployee: true,
            },
          });
        } else {
          return PrismaClient.serviceRequest.findMany({
            where: {
              ...(username && { fromEmployee: { username: username } }),
              type: RequestType.EXTERNALTRANSPORTATION,
              ...(patientName && {
                externalTransportation: { patientName: patientName },
              }),
              ...(pickupTime && {
                externalTransportation: { pickupTime: pickupTime },
              }),
              ...(transportation && {
                externalTransportation: { transportType: transportation },
              }),
              ...(pickupTransport && {
                externalTransportation: { fromWhere: pickupTransport },
              }),
              ...(dropoffTransport && {
                externalTransportation: { toWhere: dropoffTransport },
              }),
              ...(additionalNotes && { additionalNotes: additionalNotes }),
              ...(priority && { priority: priority as Priority }),
              ...(status && { status: status as Status }),
            },
            include: {
              externalTransportation: true,
              assignedTo: true,
              fromEmployee: true,
            },
          });
        }
      } else {
        if (assigned) {
          return PrismaClient.serviceRequest.findMany({
            where: {
              type: RequestType.EXTERNALTRANSPORTATION,
              ...(patientName && {
                externalTransportation: { patientName: patientName },
              }),
              ...(pickupTime && {
                externalTransportation: { pickupTime: pickupTime },
              }),
              ...(transportation && {
                externalTransportation: { transportType: transportation },
              }),
              ...(pickupTransport && {
                externalTransportation: { fromWhere: pickupTransport },
              }),
              ...(dropoffTransport && {
                externalTransportation: { toWhere: dropoffTransport },
              }),
              ...(additionalNotes && { additionalNotes: additionalNotes }),
              ...(priority && { priority: priority as Priority }),
              ...(status && { status: status as Status }),
              assignedTo: { username: ctx.username ?? undefined },
            },
            include: {
              externalTransportation: true,
              assignedTo: true,
              fromEmployee: true,
            },
          });
        } else {
          return PrismaClient.serviceRequest.findMany({
            where: {
              type: RequestType.EXTERNALTRANSPORTATION,
              ...(patientName && {
                externalTransportation: { patientName: patientName },
              }),
              ...(pickupTime && {
                externalTransportation: { pickupTime: pickupTime },
              }),
              ...(transportation && {
                externalTransportation: { transportType: transportation },
              }),
              ...(pickupTransport && {
                externalTransportation: { fromWhere: pickupTransport },
              }),
              ...(dropoffTransport && {
                externalTransportation: { toWhere: dropoffTransport },
              }),
              ...(additionalNotes && { additionalNotes: additionalNotes }),
              ...(priority && { priority: priority as Priority }),
              ...(status && { status: status as Status }),
              fromEmployee: { username: ctx.username ?? undefined },
            },
            include: {
              externalTransportation: true,
              assignedTo: true,
              fromEmployee: true,
            },
          });
        }
      }
    }),

  addExternalTransportationRequest: protectedProcedure
    .input(
      z.object({
        patientName: z.string(),
        pickupTime: z.coerce.date(),
        transportation: z.string(),
        pickupTransport: z.string(),
        dropoffTransport: z.string(),
        additionalNotes: z.string(),
        priority: z.nativeEnum(Priority),
        employeeID: z.number().optional(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const {
        patientName,
        pickupTime,
        transportation,
        pickupTransport,
        dropoffTransport,
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
          type: RequestType.EXTERNALTRANSPORTATION,
          dateCreated: new Date(Date.now()),
          status: status,
          description: additionalNotes,
          fromEmployeeID: employee.id,
          priority: priority as Priority,
          ...(employeeID && { assignedEmployeeID: employeeID }),
        },
      });
      await PrismaClient.externalTransportation.create({
        data: {
          id: serviceRequest.id,
          fromWhere: pickupTransport,
          toWhere: dropoffTransport,
          transportType: transportation,
          patientName: patientName,
          pickupTime: pickupTime,
        },
      });
      console.log("Create ext. transportation request done.");
      return {
        message: "Create ext. transportation request done.",
      };
    }),

  updateExternalTransportationRequest: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        patientName: z.string().optional(),
        pickupTime: z.coerce.date().optional(),
        transportation: z.string().optional(),
        pickupTransport: z.string().optional(),
        dropoffTransport: z.string().optional(),
        additionalNotes: z.string().optional(),
        priority: z.nativeEnum(Priority).optional(),
        employeeID: z.number().optional(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const {
        id,
        patientName,
        pickupTime,
        transportation,
        pickupTransport,
        dropoffTransport,
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
            ...(patientName ||
            pickupTime ||
            transportation ||
            pickupTransport ||
            dropoffTransport
              ? {
                  externalTransportation: {
                    update: {
                      ...(patientName && { patientName: patientName }),
                      ...(pickupTime && { pickupTime: pickupTime }),
                      ...(transportation && { transportType: transportation }),
                      ...(pickupTransport && { fromWhere: pickupTransport }),
                      ...(dropoffTransport && { toWhere: dropoffTransport }),
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
            ...(patientName ||
            pickupTime ||
            transportation ||
            pickupTransport ||
            dropoffTransport
              ? {
                  externalTransportation: {
                    update: {
                      ...(patientName && { patientName: patientName }),
                      ...(pickupTime && { pickupTime: pickupTime }),
                      ...(transportation && { transportType: transportation }),
                      ...(pickupTransport && { fromWhere: pickupTransport }),
                      ...(dropoffTransport && { toWhere: dropoffTransport }),
                    },
                  },
                }
              : {}),
          },
        });
      }

      console.log("Update ext. transportation request done.");
      return {
        message: "Update ext. transportation request done.",
      };
    }),
  deleteExternalTransportationRequest: protectedProcedure
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
