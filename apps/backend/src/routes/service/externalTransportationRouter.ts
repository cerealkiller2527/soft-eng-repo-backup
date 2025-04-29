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
      } = input;
      if (ctx.role === "admin") {
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
          },
          include: {
            externalTransportation: true,
            assignedTo: true,
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
            fromEmployee: ctx.username || "",
          },
          include: {
            externalTransportation: true,
            assignedTo: true,
          },
        });
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
      const serviceRequest = await PrismaClient.serviceRequest.create({
        data: {
          type: RequestType.EXTERNALTRANSPORTATION,
          dateCreated: new Date(Date.now()),
          status: Status.NOTASSIGNED,
          description: additionalNotes,
          fromEmployee: ctx.username || "",
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
});
