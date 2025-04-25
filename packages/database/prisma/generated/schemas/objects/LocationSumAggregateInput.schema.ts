import { z } from 'zod';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.LocationSumAggregateInputType> = z
    .object({
        id: z.literal(true).optional(),
        floor: z.literal(true).optional(),
        buildingId: z.literal(true).optional(),
        departmentId: z.literal(true).optional(),
        nodeID: z.literal(true).optional(),
    })
    .strict();

export const LocationSumAggregateInputObjectSchema = Schema;
