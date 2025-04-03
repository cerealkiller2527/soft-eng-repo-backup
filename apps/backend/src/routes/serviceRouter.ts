import express, { Router, Request, Response } from 'express';
import { Status, RequestType } from 'database';
import PrismaClient from '../bin/prisma-client';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const serviceRequests = await PrismaClient.serviceRequest.findMany();
        console.log('Service Requests:', serviceRequests);
        res.json(serviceRequests);
    } catch (err) {
        console.error('Error fetching service requests:', err);
        res.sendStatus(500);
    }
});

export default router;
