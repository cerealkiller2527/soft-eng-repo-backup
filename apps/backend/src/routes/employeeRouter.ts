import express, { Router, Request, Response } from 'express';
import { RequestType } from 'database';
import PrismaClient from '../bin/prisma-client';

const router: Router = express.Router();
router.get('/', async function (req: Request, res: Response) {
    // Attempt to save the score
    try {
        // Attempt to create in the database
        await PrismaClient.employee.createMany({
            data: [
                { name: 'Matthew Alex', employeeType: 'admin', canService: [] },
                { name: 'Bob Lens', employeeType: 'interpreter', canService: [RequestType.LANGUAGE]},
                { name: 'Sally Appleseed', employeeType: 'pilot', canService: [RequestType.EXTERNALTRANSPORTATION],},
                { name: 'Amy On', employeeType: 'security guard', canService: [RequestType.SECURITY],},
                { name: 'Lilly Kit', employeeType: 'janitor', canService: [RequestType.EQUIPMENTDELIVERY] },
                { name: 'Ila Pol', employeeType: 'interpreter', canService: [RequestType.AUDIOVISUAL, RequestType.LANGUAGE]},
            ],
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
