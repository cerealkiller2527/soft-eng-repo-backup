import { z } from 'zod';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.EmployeeSumAggregateInputType> = z
    .object({
        id: z.literal(true).optional(),
    })
    .strict();

export const EmployeeSumAggregateInputObjectSchema = Schema;
