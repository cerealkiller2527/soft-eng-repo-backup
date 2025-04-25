import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { DepartmentCountOrderByAggregateInputObjectSchema } from './DepartmentCountOrderByAggregateInput.schema';
import { DepartmentAvgOrderByAggregateInputObjectSchema } from './DepartmentAvgOrderByAggregateInput.schema';
import { DepartmentMaxOrderByAggregateInputObjectSchema } from './DepartmentMaxOrderByAggregateInput.schema';
import { DepartmentMinOrderByAggregateInputObjectSchema } from './DepartmentMinOrderByAggregateInput.schema';
import { DepartmentSumOrderByAggregateInputObjectSchema } from './DepartmentSumOrderByAggregateInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.DepartmentOrderByWithAggregationInput> = z
    .object({
        id: z.lazy(() => SortOrderSchema).optional(),
        name: z.lazy(() => SortOrderSchema).optional(),
        description: z
            .union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputObjectSchema)])
            .optional(),
        phoneNumber: z.lazy(() => SortOrderSchema).optional(),
        _count: z.lazy(() => DepartmentCountOrderByAggregateInputObjectSchema).optional(),
        _avg: z.lazy(() => DepartmentAvgOrderByAggregateInputObjectSchema).optional(),
        _max: z.lazy(() => DepartmentMaxOrderByAggregateInputObjectSchema).optional(),
        _min: z.lazy(() => DepartmentMinOrderByAggregateInputObjectSchema).optional(),
        _sum: z.lazy(() => DepartmentSumOrderByAggregateInputObjectSchema).optional(),
    })
    .strict();

export const DepartmentOrderByWithAggregationInputObjectSchema = Schema;
