import { initTRPC } from '@trpc/server';
import { ServiceRequest, RequestType, Status } from 'database';
import PrismaClient from '../bin/prisma-client';
export const t = initTRPC.create();
import { z } from 'zod';

export const serviceRouter = t.router({
    getAudioVisual: t.procedure.query(async () => {
        return PrismaClient.serviceRequest.findMany({
            where: {
                type: RequestType.AUDIOVISUAL,
            },
            include: {
                audioVisual: true,
                assignedTo: true,
            },
        });
    }),
    getExternalTransportation: t.procedure.query(async () => {
        return PrismaClient.serviceRequest.findMany({
            where: {
                type: RequestType.EXTERNALTRANSPORTATION,
            },
            include: {
                externalTransportation: true,
                assignedTo: true,
            },
        });
    }),
    getEquipmentDelivery: t.procedure.query(async () => {
        return PrismaClient.serviceRequest.findMany({
            where: {
                type: RequestType.EQUIPMENTDELIVERY,
            },
            include: {
                equipmentDelivery: true,
                assignedTo: true,
            },
        });
    }),
    getLanguage: t.procedure.query(async () => {
        return PrismaClient.serviceRequest.findMany({
            where: {
                type: RequestType.LANGUAGE,
            },
            include: {
                language: true,
                assignedTo: true,
            },
        });
    }),
    getSecurity: t.procedure.query(async () => {
        return PrismaClient.serviceRequest.findMany({
            where: {
                type: RequestType.SECURITY,
            },
            include: {
                security: true,
                assignedTo: true,
            },
        });
    }),
    getService: t.procedure.query(async () => {
        const audioVisual = PrismaClient.serviceRequest.findMany({
            where: {
                type: RequestType.AUDIOVISUAL,
            },
            include: {
                audioVisual: true,
                assignedTo: true,
            },
        });
        const externalTransportation = PrismaClient.serviceRequest.findMany({
            where: {
                type: RequestType.EXTERNALTRANSPORTATION,
            },
            include: {
                externalTransportation: true,
                assignedTo: true,
            },
        });
        const equipmentDelivery = PrismaClient.serviceRequest.findMany({
            where: {
                type: RequestType.EQUIPMENTDELIVERY,
            },
            include: {
                equipmentDelivery: true,
                assignedTo: true,
            },
        });
        const language = PrismaClient.serviceRequest.findMany({
            where: {
                type: RequestType.LANGUAGE,
            },
            include: {
                language: true,
                assignedTo: true,
            },
        });
        const security = PrismaClient.serviceRequest.findMany({
            where: {
                type: RequestType.SECURITY,
            },
            include: {
                security: true,
                assignedTo: true,
            },
        });
        const all = [
            audioVisual,
            externalTransportation,
            equipmentDelivery,
            language,
            security,
        ] as unknown as ServiceRequest[];
        const assignedRequests = all.flat();
        assignedRequests.sort((a, b) => a.id - b.id);
        return assignedRequests;
    }),
    getAssignedRequests: t.procedure.query(async () => {
        const audioVisual = PrismaClient.serviceRequest.findMany({
            where: {
                type: RequestType.AUDIOVISUAL,
                employeeID: { not: null },
            },
            include: {
                audioVisual: true,
                assignedTo: true,
            },
        });
        const externalTransportation = PrismaClient.serviceRequest.findMany({
            where: {
                type: RequestType.EXTERNALTRANSPORTATION,
                employeeID: { not: null },
            },
            include: {
                externalTransportation: true,
                assignedTo: true,
            },
        });
        const equipmentDelivery = PrismaClient.serviceRequest.findMany({
            where: {
                type: RequestType.EQUIPMENTDELIVERY,
                employeeID: { not: null },
            },
            include: {
                equipmentDelivery: true,
                assignedTo: true,
            },
        });
        const language = PrismaClient.serviceRequest.findMany({
            where: {
                type: RequestType.LANGUAGE,
                employeeID: { not: null },
            },
            include: {
                language: true,
                assignedTo: true,
            },
        });
        const security = PrismaClient.serviceRequest.findMany({
            where: {
                type: RequestType.SECURITY,
                employeeID: { not: null },
            },
            include: {
                security: true,
                assignedTo: true,
            },
        });
        const all = [
            audioVisual,
            externalTransportation,
            equipmentDelivery,
            language,
            security,
        ] as unknown as ServiceRequest[];
        const assignedRequests = all.flat();
        assignedRequests.sort((a, b) => a.id - b.id);
        return assignedRequests;
    }),
    addTransportationRequest: t.procedure
        .input(
            z.object({
                patientName: z.string(),
                pickupTime: z.coerce.date(),
                transportation: z.string(),
                pickupTransport: z.string(),
                dropoffTransport: z.string(),
                additionalNotes: z.string(),
            })
        )
        .mutation(async ({ input }) => {
            const {
                patientName,
                pickupTime,
                transportation,
                pickupTransport,
                dropoffTransport,
                additionalNotes,
            } = input;
            const serviceRequest = await PrismaClient.serviceRequest.create({
                data: {
                    type: RequestType.EXTERNALTRANSPORTATION,
                    dateCreated: new Date(Date.now()),
                    status: Status.NOTASSIGNED,
                    description: additionalNotes,
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
            console.log('Create request done');
            return {
                message: 'Create request done',
            };
        }),
});
// export type definition of API
export type serviceRouter = typeof serviceRouter;
