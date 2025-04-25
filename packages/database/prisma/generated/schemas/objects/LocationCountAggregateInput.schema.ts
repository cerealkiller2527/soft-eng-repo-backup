import { z } from 'zod';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.LocationCountAggregateInputType> = z
    .object({
        id: z.literal(true).optional(),
        floor: z.literal(true).optional(),
        suite: z.literal(true).optional(),
        buildingId: z.literal(true).optional(),
        departmentId: z.literal(true).optional(),
        nodeID: z.literal(true).optional(),
        _all: z.literal(true).optional(),
    })
    .strict();

export const LocationCountAggregateInputObjectSchema = Schema;
