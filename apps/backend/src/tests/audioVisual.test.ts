import { expect, test, describe, vi, beforeEach } from 'vitest';
import { serviceRouter } from '../routes/serviceRouter.ts';
import {RequestType, Priority, Status, Prisma} from 'database';
import PrismaClient from '../bin/prisma-client.ts';

//make fake data(doesn't connect to the database so that we can just test the routers)
vi.mock('../bin/prisma-client.ts', () => ({
    default: {
        serviceRequest: {
            findMany: vi.fn(),
            create: vi.fn(),
            update: vi.fn(),
        },
        audioVisual: {
            findMany: vi.fn(),
            create: vi.fn(),
            update: vi.fn(),
        }
    }
}))
const prisma = PrismaClient as any;

//make sure we would have a clean mock data before each test
beforeEach(() => {
    vi.clearAllMocks();
})

describe('getAudioVisualRequests', () => {
    test('filtered audioVisual requests', async () => {
        // return data only if audiovisualType matches
        prisma.serviceRequest.findMany.mockImplementation(({ where }: {where: Prisma.ServiceRequestWhereInput}) => {
            if (
                where.audioVisual?.audiovisualType === 'Projector Setup'
            ) {
                return Promise.resolve("Filter for only Projector Setup");
            }

            return Promise.resolve([]);
        });

        const caller = serviceRouter.createCaller({ prisma });

        const result = await caller.getAudioVisualRequests({
            audiovisualType: "Projector Setup",
        });

        // make sure the Prisma is called correctly
        expect(prisma.serviceRequest.findMany).toHaveBeenCalledWith({
            where: {
                type: RequestType.AUDIOVISUAL,
                audioVisual: {
                    audiovisualType: "Projector Setup",
                },
            },
            include: {
                audioVisual: true,
                assignedTo: true,
            },
        });

        // should return matching data
        expect(result).toEqual("Filter for only Projector Setup");
    });

    test('no filters audioVisual requests', async () => {
        const caller = serviceRouter.createCaller({});
        await caller.getAudioVisualRequests({});

        // make sure the Prisma is called correctly
        expect(prisma.serviceRequest.findMany).toHaveBeenCalledWith({
            where: {
                type: RequestType.AUDIOVISUAL,
            },
            include: {
                audioVisual: true,
                assignedTo: true,
            },
        });
    });
});

test('create new audioVisual data', async () => {
    const serviceRequestMock = { id: 1 };

    prisma.serviceRequest.create.mockResolvedValue(serviceRequestMock);
    prisma.audioVisual.create = vi.fn().mockResolvedValue({});

    const caller = serviceRouter.createCaller({});
    const input = {
        location: "Room 1",
        deadline: new Date('2025-08-09T09:22:18Z'),
        audiovisualType: "Projector Setup",
        additionalNotes: "",
        priority: Priority.High,
        employee: 'Emp1',
    };

    const result = await caller.addAudioVisualRequest(input);

    expect(prisma.serviceRequest.create).toHaveBeenCalledWith({
        data: {
            type: RequestType.AUDIOVISUAL,
            dateCreated: expect.any(Date),
            status: Status.NOTASSIGNED,
            description: '',
            fromEmployee: 'Emp1',
            priority: Priority.High,
        },
    });

    expect(prisma.audioVisual.create).toHaveBeenCalledWith({
        data: {
            id: 1,
            location: "Room 1",
            deadline: new Date('2025-08-09T09:22:18Z'),
            audiovisualType: "Projector Setup",
        },
    });

    expect(result).toEqual({
        message: 'Create audiovisual request done.',
    });
});

test('updates audioVisual request with some fields', async () => {
    prisma.serviceRequest.update.mockResolvedValue({ id: 1 });

    const caller = serviceRouter.createCaller({ prisma }); // pass the mock
    const input = {
        id: 1,
        priority: Priority.Medium,
        deadline: new Date('2025-08-09T09:30:18Z'),
        audiovisualType: "Projector Setup"
    };

    const result = await caller.updateAudioVisualRequest(input);

    expect(prisma.serviceRequest.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: {
            priority: Priority.Medium,
            audioVisual: {
                update: {
                    deadline: new Date('2025-08-09T09:30:18Z'),
                    audioVisualType: "Projector Setup"
                },
            },
        },
    });

    expect(result).toEqual({ message: 'Update audiovisual request done.' });
});







