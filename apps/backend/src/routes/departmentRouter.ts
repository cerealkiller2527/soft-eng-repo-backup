import { Router, Request, Response } from 'express';
import PrismaClient from '../bin/prisma-client';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const departments = await PrismaClient.department.findMany();
        console.log('Departments:', departments);
        res.json(departments);
    } catch (err) {
        console.error('Error fetching departments:', err);
        res.sendStatus(500);
    }
});

export default router;
