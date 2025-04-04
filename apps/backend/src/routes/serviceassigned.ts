import { Router, Request, Response } from 'express';
import { ServiceRequest, RequestType } from 'database';
import PrismaClient from '../bin/prisma-client';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const audioVisual = await PrismaClient.serviceRequest.findMany({
            where: {
                type: RequestType.AUDIOVISUAL,
                employeeID: { not: null },
            },
            include: {
                audioVisual: true,
                assignedTo: true,
            },
        });
        const externalTransportation = await PrismaClient.serviceRequest.findMany({
            where: {
                type: RequestType.EXTERNALTRANSPORTATION,
                employeeID: { not: null },
            },
            include: {
                externalTransportation: true,
                assignedTo: true,
            },
        });
        const equipmentDelivery = await PrismaClient.serviceRequest.findMany({
            where: {
                type: RequestType.EQUIPMENTDELIVERY,
                employeeID: { not: null },
            },
            include: {
                equipmentDelivery: true,
                assignedTo: true,
            },
        });
        const language = await PrismaClient.serviceRequest.findMany({
            where: {
                type: RequestType.LANGUAGE,
                employeeID: { not: null },
            },
            include: {
                language: true,
                assignedTo: true,
            },
        });
        const security = await PrismaClient.serviceRequest.findMany({
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
        console.log('Assigned Requests with Employees:', assignedRequests);
        res.json(assignedRequests);
    } catch (err) {
        console.error('Error fetching assigned service requests:', err);
        res.sendStatus(500);
    }
});

export default router;
