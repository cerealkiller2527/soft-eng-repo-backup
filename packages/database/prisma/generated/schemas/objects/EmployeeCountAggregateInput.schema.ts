import { z } from 'zod';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.EmployeeCountAggregateInputType> = z
    .object({
        id: z.literal(true).optional(),
        name: z.literal(true).optional(),
        employeeType: z.literal(true).optional(),
        canService: z.literal(true).optional(),
        language: z.literal(true).optional(),
        _all: z.literal(true).optional(),
    })
    .strict();

export const EmployeeCountAggregateInputObjectSchema = Schema;
