import express, { Router, Request, Response } from 'express';
import { RequestType, ServiceRequest } from 'database';
import PrismaClient from '../bin/prisma-client';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const audioVisual = await PrismaClient.serviceRequest.findMany({
            where: {
                type: RequestType.AUDIOVISUAL,
            },
            include: {
                audioVisual: true,
            },
        });
        const externalTransportation = await PrismaClient.serviceRequest.findMany({
            where: {
                type: RequestType.EXTERNALTRANSPORTATION,
            },
            include: {
                externalTransportation: true,
            },
        });
        const equipmentDelivery = await PrismaClient.serviceRequest.findMany({
            where: {
                type: RequestType.EQUIPMENTDELIVERY,
            },
            include: {
                equipmentDelivery: true,
            },
        });
        const language = await PrismaClient.serviceRequest.findMany({
            where: {
                type: RequestType.LANGUAGE,
            },
            include: {
                language: true,
            },
        });
        const security = await PrismaClient.serviceRequest.findMany({
            where: {
                type: RequestType.SECURITY,
            },
            include: {
                security: true,
            },
        });
        const all = [
            audioVisual,
            externalTransportation,
            equipmentDelivery,
            language,
            security,
        ] as unknown as ServiceRequest[];
        const serviceRequests = all.flat();
        serviceRequests.sort((a, b) => a.id - b.id);
        console.log('Service Requests:', serviceRequests);
        res.json(serviceRequests);
    } catch (err) {
        console.error('Error fetching service requests:', err);
        res.sendStatus(500);
    }
});

export default router;
