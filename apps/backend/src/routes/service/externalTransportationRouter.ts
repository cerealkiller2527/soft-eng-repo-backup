import { initTRPC } from "@trpc/server";
import { ServiceRequest, RequestType, Status, Priority } from "database";
import PrismaClient from "../../bin/prisma-client.ts";
export const t = initTRPC.create();
import { z } from "zod";

export const externalTransportationRouter = t.router({
  getExternalTransportationRequests: t.procedure
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
        employee: z.string().optional(),
      }),
    )
    .query(async ({ input }) => {
      const {
        patientName,
        pickupTime,
        transportation,
        pickupTransport,
        dropoffTransport,
        additionalNotes,
        priority,
        status,
        employee,
      } = input;
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
          ...(employee && { employee: employee }),
        },
        include: {
          externalTransportation: true,
          assignedTo: true,
        },
      });
    }),

  addExternalTransportationRequest: t.procedure
    .input(
      z.object({
        patientName: z.string(),
        pickupTime: z.coerce.date(),
        transportation: z.string(),
        pickupTransport: z.string(),
        dropoffTransport: z.string(),
        additionalNotes: z.string(),
        priority: z.nativeEnum(Priority),
        employee: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const {
        patientName,
        pickupTime,
        transportation,
        pickupTransport,
        dropoffTransport,
        additionalNotes,
        priority,
        employee,
      } = input;
      const serviceRequest = await PrismaClient.serviceRequest.create({
        data: {
          type: RequestType.EXTERNALTRANSPORTATION,
          dateCreated: new Date(Date.now()),
          status: Status.NOTASSIGNED,
          description: additionalNotes,
          fromEmployee: employee,
          priority: priority as Priority,
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

  updateExternalTransportationRequest: t.procedure
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
        employee: z.string().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const {
        id,
        patientName,
        pickupTime,
        transportation,
        pickupTransport,
        dropoffTransport,
        additionalNotes,
        priority,
        employee,
      } = input;
      const serviceRequest = await PrismaClient.serviceRequest.update({
        where: { id: id },
        data: {
          ...(additionalNotes && { additionalNotes: additionalNotes }),
          ...(priority && { priority: priority as Priority }),
          ...(employee && { employee: employee }),
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
      console.log("Update ext. transportation request done.");
      return {
        message: "Update ext. transportation request done.",
      };
    }),
});
