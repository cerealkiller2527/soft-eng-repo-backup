import { z } from 'zod';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.DepartmentServicesAvgAggregateInputType> = z
    .object({
        departmentID: z.literal(true).optional(),
        serviceID: z.literal(true).optional(),
    })
    .strict();

export const DepartmentServicesAvgAggregateInputObjectSchema = Schema;
