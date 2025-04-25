import { z } from 'zod';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.DepartmentMaxAggregateInputType> = z
    .object({
        id: z.literal(true).optional(),
        name: z.literal(true).optional(),
        description: z.literal(true).optional(),
        phoneNumber: z.literal(true).optional(),
    })
    .strict();

export const DepartmentMaxAggregateInputObjectSchema = Schema;
