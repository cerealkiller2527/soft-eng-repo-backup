import { z } from 'zod';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.EdgeMaxAggregateInputType> = z
    .object({
        id: z.literal(true).optional(),
        fromNodeId: z.literal(true).optional(),
        toNodeId: z.literal(true).optional(),
    })
    .strict();

export const EdgeMaxAggregateInputObjectSchema = Schema;
