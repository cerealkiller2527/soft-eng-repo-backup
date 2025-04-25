import { z } from 'zod';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.SecurityCountAggregateInputType> = z
    .object({
        id: z.literal(true).optional(),
        location: z.literal(true).optional(),
        _all: z.literal(true).optional(),
    })
    .strict();

export const SecurityCountAggregateInputObjectSchema = Schema;
