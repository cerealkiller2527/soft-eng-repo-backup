import { z } from 'zod';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.SecuritySumAggregateInputType> = z
    .object({
        id: z.literal(true).optional(),
    })
    .strict();

export const SecuritySumAggregateInputObjectSchema = Schema;
