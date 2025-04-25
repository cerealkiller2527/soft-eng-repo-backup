import { z } from 'zod';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.DepartmentServicesSumAggregateInputType> = z
    .object({
        departmentID: z.literal(true).optional(),
        serviceID: z.literal(true).optional(),
    })
    .strict();

export const DepartmentServicesSumAggregateInputObjectSchema = Schema;
