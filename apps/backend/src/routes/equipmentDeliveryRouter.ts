import { initTRPC } from '@trpc/server';
import { ServiceRequest, RequestType, Status, Priority } from 'database';
import PrismaClient from '../bin/prisma-client';
export const t = initTRPC.create();
import { z } from 'zod';

export const equipmentDeliveryRouter = t.router({
    getEquipmentDeliveryRequests: t.procedure
        .input(
            z.object({
                deadline: z.coerce.date().optional(),
                equipment: z.array(z.string()).optional(),
                toWhere: z.string().optional(),
                additionalNotes: z.string().optional(),
                priority: z.nativeEnum(Priority).optional(),
                status: z.nativeEnum(Status).optional(),
                employee: z.string().optional(),
            })
        )
        .query(async ({ input }) => {
            const { deadline, equipment, toWhere, additionalNotes, priority, status, employee } =
                input;
            return PrismaClient.serviceRequest.findMany({
                where: {
                    type: RequestType.EQUIPMENTDELIVERY,
                    ...(deadline && { equipmentDelivery: { deadline: deadline } }),
                    ...(equipment && { equipmentDelivery: { equipments: { hasSome: equipment } } }),
                    ...(toWhere && { equipmentDelivery: { toWhere: toWhere } }),
                    ...(additionalNotes && { additionalNotes: additionalNotes }),
                    ...(priority && { priority: priority as Priority }),
                    ...(status && { status: status as Status }),
                    ...(employee && { employee: employee }),
                },
                include: {
                    equipmentDelivery: true,
                    assignedTo: true,
                },
            });
        }),

    addEquipmentDeliveryRequest: t.procedure
        .input(
            z.object({
                deadline: z.coerce.date(),
                equipment: z.array(z.string()),
                toWhere: z.string(),
                additionalNotes: z.string(),
                priority: z.nativeEnum(Priority),
                employee: z.string(),
            })
        )
        .mutation(async ({ input }) => {
            const { deadline, equipment, toWhere, additionalNotes, priority, employee } = input;
            const serviceRequest = await PrismaClient.serviceRequest.create({
                data: {
                    type: RequestType.EQUIPMENTDELIVERY,
                    dateCreated: new Date(Date.now()),
                    status: Status.NOTASSIGNED,
                    description: additionalNotes,
                    fromEmployee: employee,
                    priority: priority as Priority,
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
            console.log('Create equipment delivery request done.');
            return {
                message: 'Create equipment delivery request done.',
            };
        }),

    updateEquipmentDeliveryRequest: t.procedure
        .input(
            z.object({
                id: z.number(),
                deadline: z.coerce.date().optional(),
                equipment: z.array(z.string()).optional(),
                toWhere: z.string().optional(),
                additionalNotes: z.string().optional(),
                priority: z.nativeEnum(Priority).optional(),
                employee: z.string().optional(),
            })
        )
        .mutation(async ({ input }) => {
            const { id, deadline, equipment, toWhere, additionalNotes, priority, employee } = input;
            const serviceRequest = await PrismaClient.serviceRequest.update({
                where: { id: id },
                data: {
                    ...(additionalNotes && { additionalNotes: additionalNotes }),
                    ...(priority && { priority: priority as Priority }),
                    ...(employee && { employee: employee }),
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
            console.log('Update equipment delivery request done.');
            return {
                message: 'Update equipment delivery request done.',
            };
        }),
});
