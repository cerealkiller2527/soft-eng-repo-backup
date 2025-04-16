import { initTRPC } from '@trpc/server';
import { ServiceRequest, RequestType, Status, Priority } from 'database';
import PrismaClient from '../bin/prisma-client';
export const t = initTRPC.create();
import { z } from 'zod';

export const audiovisualRouter = t.router({
    getAudioVisualRequests: t.procedure
        .input(
            z.object({
                location: z.string().optional(),
                deadline: z.coerce.date().optional(),
                audiovisualType: z.string().optional(),
                additionalNotes: z.string().optional(),
                priority: z.nativeEnum(Priority).optional(),
                status: z.nativeEnum(Status).optional(),
                employee: z.string().optional(),
            })
        )
        .query(async ({ input }) => {
            const {
                location,
                deadline,
                audiovisualType,
                additionalNotes,
                priority,
                status,
                employee,
            } = input;
            return PrismaClient.serviceRequest.findMany({
                where: {
                    type: RequestType.AUDIOVISUAL,
                    ...(location && { audiovisual: { location: location } }),
                    ...(deadline && { audioVisual: { deadline: deadline } }),
                    ...(audiovisualType && { audioVisual: { audiovisualType: audiovisualType } }),
                    ...(additionalNotes && { additionalNotes: additionalNotes }),
                    ...(priority && { priority: priority as Priority }),
                    ...(status && { status: status as Status }),
                    ...(employee && { employee: employee }),
                },
                include: {
                    audioVisual: true,
                    assignedTo: true,
                },
            });
        }),

    addAudioVisualRequest: t.procedure
        .input(
            z.object({
                location: z.string(),
                deadline: z.coerce.date(),
                audiovisualType: z.string(),
                additionalNotes: z.string(),
                priority: z.nativeEnum(Priority),
                employee: z.string(),
            })
        )
        .mutation(async ({ input }) => {
            const { location, deadline, audiovisualType, additionalNotes, priority, employee } =
                input;
            const serviceRequest = await PrismaClient.serviceRequest.create({
                data: {
                    type: RequestType.AUDIOVISUAL,
                    dateCreated: new Date(Date.now()),
                    status: Status.NOTASSIGNED,
                    description: additionalNotes,
                    fromEmployee: employee,
                    priority: priority as Priority,
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
            console.log('Create audiovisual request done.');
            return {
                message: 'Create audiovisual request done.',
            };
        }),

    updateAudioVisualRequest: t.procedure
        .input(
            z.object({
                id: z.number(),
                location: z.string().optional(),
                deadline: z.coerce.date().optional(),
                audiovisualType: z.string().optional(),
                additionalNotes: z.string().optional(),
                priority: z.nativeEnum(Priority).optional(),
                employee: z.string().optional(),
            })
        )
        .mutation(async ({ input }) => {
            const { id, location, deadline, audiovisualType, additionalNotes, priority, employee } =
                input;
            const serviceRequest = await PrismaClient.serviceRequest.update({
                where: { id: id },
                data: {
                    ...(additionalNotes && { additionalNotes: additionalNotes }),
                    ...(priority && { priority: priority as Priority }),
                    ...(employee && { employee: employee }),
                    ...(location || deadline || audiovisualType
                        ? {
                              audioVisual: {
                                  update: {
                                      ...(location && { location: location }),
                                      ...(deadline && { deadline: deadline }),
                                      ...(audiovisualType && { audioVisualType: audiovisualType }),
                                  },
                              },
                          }
                        : {}),
                },
            });
            console.log('Update audiovisual request done.');
            return {
                message: 'Update audiovisual request done.',
            };
        }),
});
