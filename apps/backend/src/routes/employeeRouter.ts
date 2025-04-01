import express, { Router, Request, Response } from 'express';
import { Prisma } from 'database';
import PrismaClient from '../bin/prisma-client';

const router: Router = express.Router();
router.get('/', async function (req: Request, res: Response) {
    // Attempt to save the score
    try {
        // Attempt to create in the database
        await PrismaClient.employee.create({
            data: {
                name: 'Matthew Alex',
                employeeType: 'Admin',
            },
        });
        console.info('Successfully saved emplyee'); // Log that it was successful
    } catch (error) {
        // Log any failures
        console.error(`Unable to save score attempt`);
        res.sendStatus(400); // Send error
        return; // Don't try to send duplicate statuses
    }

    res.sendStatus(200); // Otherwise say it's fine
});

export default router;
