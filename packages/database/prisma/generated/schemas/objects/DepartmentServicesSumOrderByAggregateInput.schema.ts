import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.DepartmentServicesSumOrderByAggregateInput> = z
    .object({
        departmentID: z.lazy(() => SortOrderSchema).optional(),
        serviceID: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const DepartmentServicesSumOrderByAggregateInputObjectSchema = Schema;
