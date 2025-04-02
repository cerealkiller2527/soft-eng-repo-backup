import express, { Router, Request, Response } from 'express';
import { Status, RequestType } from 'database';
import PrismaClient from '../bin/prisma-client';

const router: Router = express.Router();
router.get('/', async function (req: Request, res: Response) {
    // Attempt to save the score
    try {
        // Attempt to create in the database
        await PrismaClient.serviceRequest.createMany({
            data: [
                {
                    type: RequestType.AUDIOVISUAL,
                    dateUpdated: new Date('2024-04-01T12:00:00Z'),
                    deadline: new Date('2024-04-01T16:00:00Z'),
                    status: Status.INPROGRESS,
                    description: 'Projector setup for conference room',
                    priority: 1,
                    employeeID: 3,
                },
                {
                    type: RequestType.EXTERNALTRANSPORTATION,
                    dateUpdated: null,
                    deadline: new Date('2024-04-02T15:30:00Z'),
                    status: Status.NOTASSIGNED,
                    description: 'Shuttle service for VIP guest',
                    priority: 2,
                    employeeID: null,
                },
                {
                    type: RequestType.EQUIPMENTDELIVERY,
                    dateUpdated: new Date('2024-04-01T11:00:00Z'),
                    deadline: new Date('2024-04-02T14:00:00Z'),
                    status: Status.ASSIGNED,
                    description: 'Deliver new laptops to IT department',
                    priority: 3,
                    employeeID: 5,
                },
                {
                    type: RequestType.LANGUAGE,
                    dateUpdated: new Date('2024-03-31T18:45:00Z'),
                    deadline: new Date('2024-04-04T08:00:00Z'),
                    status: Status.COMPLETED,
                    description: 'Request for Chinese interpreter for meeting',
                    priority: 4,
                    employeeID: 2,
                },
                {
                    type: RequestType.LANGUAGE,
                    dateUpdated: null,
                    deadline: new Date('2024-04-04T12:00:00Z'),
                    status: Status.NOTASSIGNED,
                    description: 'Request for Spanish interpreter for meeting',
                    priority: 5,
                    employeeID: null,
                },
                {
                    type: RequestType.SECURITY,
                    dateUpdated: new Date('2024-04-01T09:00:00Z'),
                    deadline: new Date('2024-04-05T17:00:00Z'),
                    status: Status.INPROGRESS,
                    description: 'Deep cleaning for conference hall',
                    priority: 6,
                    employeeID: 4,
                },
                {
                    type: RequestType.SECURITY,
                    dateUpdated: new Date('2024-04-01T02:30:00Z'),
                    deadline: new Date('2024-04-06T09:45:00Z'),
                    status: Status.COMPLETED,
                    description: 'Increase security presence for night event',
                    priority: 7,
                    employeeID: 1,
                },
                {
                    type: RequestType.EQUIPMENTDELIVERY,
                    dateUpdated: new Date('2024-04-01T08:00:00Z'),
                    deadline: new Date('2024-04-06T14:30:00Z'),
                    status: Status.ASSIGNED,
                    description: 'Move office chairs to the new wing',
                    priority: 8,
                    employeeID: 2,
                },
                {
                    type: RequestType.AUDIOVISUAL,
                    dateUpdated: null,
                    deadline: new Date('2024-04-07T11:15:00Z'),
                    status: Status.ASSIGNED,
                    description: 'Speaker and sound check for conference',
                    priority: 9,
                    employeeID: null,
                },
                {
                    type: RequestType.AUDIOVISUAL,
                    dateUpdated: new Date('2024-04-02T08:30:00Z'),
                    deadline: new Date('2024-04-07T19:00:00Z'),
                    status: Status.NOTASSIGNED,
                    description: 'Microphone setup for executive meeting',
                    priority: 3,
                    employeeID: null,
                },
            ],
        });

        console.info('Successfully saved request'); // Log that it was successful
    } catch (error) {
        // Log any failures
        console.error(`Unable to save score attempt`);
        res.sendStatus(400); // Send error
        return; // Don't try to send duplicate statuses
    }

    res.sendStatus(200); // Otherwise say it's fine
});

export default router;
