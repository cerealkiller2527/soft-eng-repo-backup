import { t, protectedProcedure } from "../../trpc.ts";
import { ServiceRequest, RequestType, Status, Priority } from "database";
import PrismaClient from "../../bin/prisma-client.ts";
import { z } from "zod";

export const equipmentDeliveryRouter = t.router({
  getEquipmentDeliveryRequests: protectedProcedure
    .input(
      z.object({
        deadline: z.coerce.date().optional(),
        equipment: z.array(z.string()).optional(),
        toWhere: z.string().optional(),
        additionalNotes: z.string().optional(),
        priority: z.nativeEnum(Priority).optional(),
        status: z.nativeEnum(Status).optional(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const {
        deadline,
        equipment,
        toWhere,
        additionalNotes,
        priority,
        status,
      } = input;
      if (ctx.role === "admin") {
        return PrismaClient.serviceRequest.findMany({
          where: {
            type: RequestType.EQUIPMENTDELIVERY,
            ...(deadline && { equipmentDelivery: { deadline: deadline } }),
            ...(equipment && {
              equipmentDelivery: { equipments: { hasSome: equipment } },
            }),
            ...(toWhere && { equipmentDelivery: { toWhere: toWhere } }),
            ...(additionalNotes && { additionalNotes: additionalNotes }),
            ...(priority && { priority: priority as Priority }),
            ...(status && { status: status as Status }),
          },
          include: {
            equipmentDelivery: true,
            assignedTo: true,
          },
        });
      } else {
        return PrismaClient.serviceRequest.findMany({
          where: {
            type: RequestType.EQUIPMENTDELIVERY,
            ...(deadline && { equipmentDelivery: { deadline: deadline } }),
            ...(equipment && {
              equipmentDelivery: { equipments: { hasSome: equipment } },
            }),
            ...(toWhere && { equipmentDelivery: { toWhere: toWhere } }),
            ...(additionalNotes && { additionalNotes: additionalNotes }),
            ...(priority && { priority: priority as Priority }),
            ...(status && { status: status as Status }),
            fromEmployee: ctx.username ?? undefined,
          },
          include: {
            equipmentDelivery: true,
            assignedTo: true,
          },
        });
      }
    }),

  addEquipmentDeliveryRequest: protectedProcedure
    .input(
      z.object({
        deadline: z.coerce.date(),
        equipment: z.array(z.string()),
        toWhere: z.string(),
        additionalNotes: z.string(),
        priority: z.nativeEnum(Priority),
        employeeID: z.number().optional(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const {
        deadline,
        equipment,
        toWhere,
        additionalNotes,
        priority,
        employeeID,
      } = input;
      let status: Status = Status.NOTASSIGNED;
      if (employeeID != undefined) {
        status = Status.ASSIGNED;
      }
      const serviceRequest = await PrismaClient.serviceRequest.create({
        data: {
          type: RequestType.EQUIPMENTDELIVERY,
          dateCreated: new Date(Date.now()),
          status: status,
          description: additionalNotes,
          fromEmployee: ctx.username || "",
          priority: priority as Priority,
          ...(employeeID && { assignedEmployeeID: employeeID }),
        },
      });
      await PrismaClient.equipmentDelivery.create({
        data: {
          id: serviceRequest.id,
          deadline: deadline,
          equipments: equipment,
          toWhere: toWhere,
        },
      });
      console.log("Create equipment delivery request done.");
      return {
        message: "Create equipment delivery request done.",
      };
    }),

  updateEquipmentDeliveryRequest: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        deadline: z.coerce.date().optional(),
        equipment: z.array(z.string()).optional(),
        toWhere: z.string().optional(),
        additionalNotes: z.string().optional(),
        priority: z.nativeEnum(Priority).optional(),
        employeeID: z.number().optional(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const {
        id,
        deadline,
        equipment,
        toWhere,
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
            ...(deadline || equipment || toWhere
              ? {
                  equipmentDelivery: {
                    update: {
                      ...(deadline && { deadline: deadline }),
                      ...(equipment && { equipments: equipment }), // if we want to append, then use { push: equipment }
                      ...(toWhere && { toWhere: toWhere }),
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
            ...(deadline || equipment || toWhere
              ? {
                  equipmentDelivery: {
                    update: {
                      ...(deadline && { deadline: deadline }),
                      ...(equipment && { equipments: equipment }), // if we want to append, then use { push: equipment }
                      ...(toWhere && { toWhere: toWhere }),
                    },
                  },
                }
              : {}),
          },
        });
      }

      console.log("Update equipment delivery request done.");
      return {
        message: "Update equipment delivery request done.",
      };
    }),
  deleteEquipmentDeliveryRequest: protectedProcedure
      .input(
          z.object({
            id: z.number()
          })
      )
      .mutation(async ({ input, ctx }) => {
          await PrismaClient.equipmentDelivery.delete({
            where: {
              id: input.id,
            }
          })
      })
});
