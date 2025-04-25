import { z } from 'zod';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.SecurityMaxAggregateInputType> = z
    .object({
        id: z.literal(true).optional(),
        location: z.literal(true).optional(),
    })
    .strict();

export const SecurityMaxAggregateInputObjectSchema = Schema;
