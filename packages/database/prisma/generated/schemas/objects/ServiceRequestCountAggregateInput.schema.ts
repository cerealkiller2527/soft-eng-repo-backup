import { z } from 'zod';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.ServiceRequestCountAggregateInputType> = z
    .object({
        id: z.literal(true).optional(),
        type: z.literal(true).optional(),
        dateCreated: z.literal(true).optional(),
        dateUpdated: z.literal(true).optional(),
        status: z.literal(true).optional(),
        description: z.literal(true).optional(),
        assignedEmployeeID: z.literal(true).optional(),
        fromEmployee: z.literal(true).optional(),
        priority: z.literal(true).optional(),
        _all: z.literal(true).optional(),
    })
    .strict();

export const ServiceRequestCountAggregateInputObjectSchema = Schema;
