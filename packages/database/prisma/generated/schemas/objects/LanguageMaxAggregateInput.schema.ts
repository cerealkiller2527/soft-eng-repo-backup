import { z } from 'zod';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.LanguageMaxAggregateInputType> = z
    .object({
        id: z.literal(true).optional(),
        location: z.literal(true).optional(),
        language: z.literal(true).optional(),
        startTime: z.literal(true).optional(),
        endTime: z.literal(true).optional(),
    })
    .strict();

export const LanguageMaxAggregateInputObjectSchema = Schema;
