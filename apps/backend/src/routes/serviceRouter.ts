import { initTRPC } from '@trpc/server';
import { ServiceRequest, RequestType, Status, Priority } from 'database';
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
                assignedEmployeeID: { not: null },
            },
            include: {
                audioVisual: true,
                assignedTo: true,
            },
        });
        const externalTransportation = PrismaClient.serviceRequest.findMany({
            where: {
                type: RequestType.EXTERNALTRANSPORTATION,
                assignedEmployeeID: { not: null },
            },
            include: {
                externalTransportation: true,
                assignedTo: true,
            },
        });
        const equipmentDelivery = PrismaClient.serviceRequest.findMany({
            where: {
                type: RequestType.EQUIPMENTDELIVERY,
                assignedEmployeeID: { not: null },
            },
            include: {
                equipmentDelivery: true,
                assignedTo: true,
            },
        });
        const language = PrismaClient.serviceRequest.findMany({
            where: {
                type: RequestType.LANGUAGE,
                assignedEmployeeID: { not: null },
            },
            include: {
                language: true,
                assignedTo: true,
            },
        });
        const security = PrismaClient.serviceRequest.findMany({
            where: {
                type: RequestType.SECURITY,
                assignedEmployeeID: { not: null },
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
                priority: z.nativeEnum(Priority),
                employee: z.string(),
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
            console.log('Create request done');
            return {
                message: 'Create request done',
            };
        }),
    addEquipmentRequest: t.procedure
        .input(
            z.object({
                deadline: z.coerce.date(),
                equipment: z.array(z.string()),
                location: z.string(),
                additionalNotes: z.string(),
                priority: z.nativeEnum(Priority),
                employee: z.string(),
            })
        )
        .mutation(async ({ input }) => {
            const { deadline, equipment, location, additionalNotes, priority, employee } = input;
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
                    toWhere: location,
                },
            });
            console.log('Create request done');
            return {
                message: 'Create request done',
            };
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
            console.log('Create request done');
            return {
                message: 'Create request done',
            };
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
            console.log('Create request done');
            return {
                message: 'Create request done',
            };
        }),
});
// export type definition of API
export type serviceRouter = typeof serviceRouter;
