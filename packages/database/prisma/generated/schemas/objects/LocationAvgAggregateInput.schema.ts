import { z } from 'zod';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.LocationAvgAggregateInputType> = z
    .object({
        id: z.literal(true).optional(),
        floor: z.literal(true).optional(),
        buildingId: z.literal(true).optional(),
        departmentId: z.literal(true).optional(),
        nodeID: z.literal(true).optional(),
    })
    .strict();

export const LocationAvgAggregateInputObjectSchema = Schema;
