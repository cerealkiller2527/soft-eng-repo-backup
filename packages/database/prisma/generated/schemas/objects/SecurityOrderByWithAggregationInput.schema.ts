import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SecurityCountOrderByAggregateInputObjectSchema } from './SecurityCountOrderByAggregateInput.schema';
import { SecurityAvgOrderByAggregateInputObjectSchema } from './SecurityAvgOrderByAggregateInput.schema';
import { SecurityMaxOrderByAggregateInputObjectSchema } from './SecurityMaxOrderByAggregateInput.schema';
import { SecurityMinOrderByAggregateInputObjectSchema } from './SecurityMinOrderByAggregateInput.schema';
import { SecuritySumOrderByAggregateInputObjectSchema } from './SecuritySumOrderByAggregateInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.SecurityOrderByWithAggregationInput> = z
    .object({
        id: z.lazy(() => SortOrderSchema).optional(),
        location: z.lazy(() => SortOrderSchema).optional(),
        _count: z.lazy(() => SecurityCountOrderByAggregateInputObjectSchema).optional(),
        _avg: z.lazy(() => SecurityAvgOrderByAggregateInputObjectSchema).optional(),
        _max: z.lazy(() => SecurityMaxOrderByAggregateInputObjectSchema).optional(),
        _min: z.lazy(() => SecurityMinOrderByAggregateInputObjectSchema).optional(),
        _sum: z.lazy(() => SecuritySumOrderByAggregateInputObjectSchema).optional(),
    })
    .strict();

export const SecurityOrderByWithAggregationInputObjectSchema = Schema;
