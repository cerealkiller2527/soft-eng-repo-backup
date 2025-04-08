import { initTRPC } from '@trpc/server';
import { ServiceRequest, RequestType, Status } from 'database';
import PrismaClient from '../bin/prisma-client';
export const t = initTRPC.create();
import { z } from 'zod';
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

export const serviceRouter = t.router({
    getAudioVisual: t.procedure.query(async () => {
        return audioVisual;
    }),
    getExternalTransportation: t.procedure.query(async () => {
        return externalTransportation;
    }),
    getEquipmentDelivery: t.procedure.query(async () => {
        return equipmentDelivery;
    }),
    getLanguage: t.procedure.query(async () => {
        return language;
    }),
    getSecurity: t.procedure.query(async () => {
        return security;
    }),
    getService: t.procedure.query(async () => {
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
    addRequest: t.procedure
        .input(
            z.object({
                patientName: z.string(),
                pickupTime: z.date(),
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
                    dateCreated: new Date(Date.now()).toLocaleString(),
                    status: Status.NOTASSIGNED,
                    description: additionalNotes,
                },
            });
            PrismaClient.externalTransportation.create({
                data: {
                    id: serviceRequest.id,
                    fromWhere: pickupTransport,
                    toWhere: pickupTransport,
                    transportType: transportation,
                    patientName: patientName,
                    pickupTime: pickupTime,
                },
            });
        }),
});
// export type definition of API
export type serviceRouter = typeof serviceRouter;
