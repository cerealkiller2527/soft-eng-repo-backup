import { z } from 'zod';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.UserMaxAggregateInputType> = z
    .object({
        username: z.literal(true).optional(),
        password: z.literal(true).optional(),
        email: z.literal(true).optional(),
    })
    .strict();

export const UserMaxAggregateInputObjectSchema = Schema;
