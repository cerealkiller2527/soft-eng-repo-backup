import { z } from 'zod';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.AudioVisualCountAggregateInputType> = z
    .object({
        id: z.literal(true).optional(),
        location: z.literal(true).optional(),
        deadline: z.literal(true).optional(),
        audiovisualType: z.literal(true).optional(),
        _all: z.literal(true).optional(),
    })
    .strict();

export const AudioVisualCountAggregateInputObjectSchema = Schema;
