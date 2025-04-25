import { z } from 'zod';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.EmployeeAvgAggregateInputType> = z
    .object({
        id: z.literal(true).optional(),
    })
    .strict();

export const EmployeeAvgAggregateInputObjectSchema = Schema;
