import { z } from 'zod';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.EdgeCountAggregateInputType> = z
    .object({
        id: z.literal(true).optional(),
        fromNodeId: z.literal(true).optional(),
        toNodeId: z.literal(true).optional(),
        _all: z.literal(true).optional(),
    })
    .strict();

export const EdgeCountAggregateInputObjectSchema = Schema;
