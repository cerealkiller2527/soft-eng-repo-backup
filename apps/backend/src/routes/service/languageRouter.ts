import { initTRPC } from '@trpc/server';
import { ServiceRequest, RequestType, Status, Priority } from 'database';
import PrismaClient from '../../bin/prisma-client.ts';
export const t = initTRPC.create();
import { z } from 'zod';

export const languageRouter = t.router({
    getLanguageRequests: t.procedure
        .input(
            z.object({
                language: z.string().optional(),
                location: z.string().optional(),
                startTime: z.coerce.date().optional(),
                endTime: z.coerce.date().optional(),
                additionalNotes: z.string().optional(),
                priority: z.nativeEnum(Priority).optional(),
                status: z.nativeEnum(Status).optional(),
                employee: z.string().optional(),
            })
        )
        .query(async ({ input }) => {
            const {
                language,
                location,
                startTime,
                endTime,
                additionalNotes,
                priority,
                status,
                employee,
            } = input;
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
                    ...(employee && { employee: employee }),
                },
                include: {
                    language: true,
                    assignedTo: true,
                },
            });
        }),

    addLanguageRequest: t.procedure
        .input(
            z.object({
                language: z.string(),
                location: z.string(),
                startTime: z.coerce.date(),
                endTime: z.coerce.date(),
                additionalNotes: z.string(),
                priority: z.nativeEnum(Priority),
                employee: z.string(),
            })
        )
        .mutation(async ({ input }) => {
            const { language, location, startTime, endTime, additionalNotes, priority, employee } =
                input;
            const serviceRequest = await PrismaClient.serviceRequest.create({
                data: {
                    type: RequestType.LANGUAGE,
                    dateCreated: new Date(Date.now()),
                    status: Status.NOTASSIGNED,
                    description: additionalNotes,
                    fromEmployee: employee,
                    priority: priority as Priority,
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
            console.log('Create language request done.');
            return {
                message: 'Create language request done.',
            };
        }),

    updateLanguageRequest: t.procedure
        .input(
            z.object({
                id: z.number(),
                language: z.string().optional(),
                location: z.string().optional(),
                startTime: z.coerce.date().optional(),
                endTime: z.coerce.date().optional(),
                additionalNotes: z.string().optional(),
                priority: z.nativeEnum(Priority).optional(),
                employee: z.string().optional(),
            })
        )
        .mutation(async ({ input }) => {
            const {
                id,
                language,
                location,
                startTime,
                endTime,
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
            console.log('Update language request done.');
            return {
                message: 'Update language request done.',
            };
        }),
});
