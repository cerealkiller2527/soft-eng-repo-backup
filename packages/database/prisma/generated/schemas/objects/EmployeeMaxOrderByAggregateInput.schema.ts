import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.EmployeeMaxOrderByAggregateInput> = z
    .object({
        id: z.lazy(() => SortOrderSchema).optional(),
        name: z.lazy(() => SortOrderSchema).optional(),
        employeeType: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const EmployeeMaxOrderByAggregateInputObjectSchema = Schema;
