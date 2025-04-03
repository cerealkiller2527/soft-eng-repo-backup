import { Router, Request, Response } from 'express';
import PrismaClient from '../bin/prisma-client';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const employees = await PrismaClient.employee.findMany();
        console.log('Employees:', employees);
        res.json(employees);
    } catch (err) {
        console.error('Error fetching employees:', err);
        res.sendStatus(500);
    }
});

export default router;
