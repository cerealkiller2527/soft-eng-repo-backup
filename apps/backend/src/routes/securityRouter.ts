import { initTRPC } from '@trpc/server';
import { ServiceRequest, RequestType, Status, Priority } from 'database';
import PrismaClient from '../bin/prisma-client';
export const t = initTRPC.create();
import { z } from 'zod';

export const securityRouter = t.router({
    getSecurityRequests: t.procedure
        .input(
            z.object({
                location: z.string().optional(),
                additionalNotes: z.string().optional(),
                priority: z.nativeEnum(Priority).optional(),
                employee: z.string().optional(),
            })
        )
        .query(async ({ input }) => {
            const { location, additionalNotes, priority, employee } = input;
            return PrismaClient.serviceRequest.findMany({
                where: {
                    type: RequestType.SECURITY,
                    ...(location && { security: { location: location } }),
                    ...(additionalNotes && { additionalNotes: additionalNotes }),
                    ...(priority && { priority: priority as Priority }),
                    ...(employee && { employee: employee }),
                },
                include: {
                    security: true,
                    assignedTo: true,
                },
            });
        }),

    addSecurityRequest: t.procedure
        .input(
            z.object({
                location: z.string(),
                additionalNotes: z.string(),
                priority: z.nativeEnum(Priority),
                employee: z.string(),
            })
        )
        .mutation(async ({ input }) => {
            const { location, additionalNotes, priority, employee } = input;
            const serviceRequest = await PrismaClient.serviceRequest.create({
                data: {
                    type: RequestType.SECURITY,
                    dateCreated: new Date(Date.now()),
                    status: Status.NOTASSIGNED,
                    description: additionalNotes,
                    fromEmployee: employee,
                    priority: priority as Priority,
                },
            });
            await PrismaClient.security.create({
                data: {
                    id: serviceRequest.id,
                    location: location,
                },
            });
            console.log('Create security request done.');
            return {
                message: 'Create security request done.',
            };
        }),

    updateSecurityRequest: t.procedure
        .input(
            z.object({
                id: z.number(),
                location: z.string().optional(),
                additionalNotes: z.string().optional(),
                priority: z.nativeEnum(Priority).optional(),
                employee: z.string().optional(),
            })
        )
        .mutation(async ({ input }) => {
            const { id, location, additionalNotes, priority, employee } = input;
            const serviceRequest = await PrismaClient.serviceRequest.update({
                where: { id: id },
                data: {
                    ...(additionalNotes && { additionalNotes: additionalNotes }),
                    ...(priority && { priority: priority as Priority }),
                    ...(employee && { employee: employee }),
                    ...(location && { security: { update: location } }),
                },
            });
            console.log('Update security request done.');
            return {
                message: 'Update security request done.',
            };
        }),
});
