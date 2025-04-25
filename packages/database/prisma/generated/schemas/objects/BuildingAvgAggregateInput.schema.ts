import { z } from 'zod';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.BuildingAvgAggregateInputType> = z
    .object({
        id: z.literal(true).optional(),
    })
    .strict();

export const BuildingAvgAggregateInputObjectSchema = Schema;
