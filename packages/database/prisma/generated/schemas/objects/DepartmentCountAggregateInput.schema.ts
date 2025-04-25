import { z } from 'zod';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.DepartmentCountAggregateInputType> = z
    .object({
        id: z.literal(true).optional(),
        name: z.literal(true).optional(),
        description: z.literal(true).optional(),
        phoneNumber: z.literal(true).optional(),
        _all: z.literal(true).optional(),
    })
    .strict();

export const DepartmentCountAggregateInputObjectSchema = Schema;
