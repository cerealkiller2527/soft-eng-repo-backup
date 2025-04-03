import { Router, Request, Response } from 'express';
import PrismaClient from '../bin/prisma-client';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const assignedRequests = await PrismaClient.serviceRequest.findMany({
            where: {
                employeeID: { not: null },
            },
            include: {
                assignedTo: true, // assumes 'assignedTo' is the relation field for employee
            },
        });
        console.log('Assigned Requests with Employees:', assignedRequests);
        res.json(assignedRequests);
    } catch (err) {
        console.error('Error fetching assigned service requests:', err);
        res.sendStatus(500);
    }
});

export default router;
