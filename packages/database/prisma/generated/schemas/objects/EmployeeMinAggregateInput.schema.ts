import { z } from 'zod';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.EmployeeMinAggregateInputType> = z
    .object({
        id: z.literal(true).optional(),
        name: z.literal(true).optional(),
        employeeType: z.literal(true).optional(),
    })
    .strict();

export const EmployeeMinAggregateInputObjectSchema = Schema;
