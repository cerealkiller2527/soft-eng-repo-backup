import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { DepartmentServicesCountOrderByAggregateInputObjectSchema } from './DepartmentServicesCountOrderByAggregateInput.schema';
import { DepartmentServicesAvgOrderByAggregateInputObjectSchema } from './DepartmentServicesAvgOrderByAggregateInput.schema';
import { DepartmentServicesMaxOrderByAggregateInputObjectSchema } from './DepartmentServicesMaxOrderByAggregateInput.schema';
import { DepartmentServicesMinOrderByAggregateInputObjectSchema } from './DepartmentServicesMinOrderByAggregateInput.schema';
import { DepartmentServicesSumOrderByAggregateInputObjectSchema } from './DepartmentServicesSumOrderByAggregateInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.DepartmentServicesOrderByWithAggregationInput> = z
    .object({
        departmentID: z.lazy(() => SortOrderSchema).optional(),
        serviceID: z.lazy(() => SortOrderSchema).optional(),
        _count: z.lazy(() => DepartmentServicesCountOrderByAggregateInputObjectSchema).optional(),
        _avg: z.lazy(() => DepartmentServicesAvgOrderByAggregateInputObjectSchema).optional(),
        _max: z.lazy(() => DepartmentServicesMaxOrderByAggregateInputObjectSchema).optional(),
        _min: z.lazy(() => DepartmentServicesMinOrderByAggregateInputObjectSchema).optional(),
        _sum: z.lazy(() => DepartmentServicesSumOrderByAggregateInputObjectSchema).optional(),
    })
    .strict();

export const DepartmentServicesOrderByWithAggregationInputObjectSchema = Schema;
