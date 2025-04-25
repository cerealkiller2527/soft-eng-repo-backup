import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { EdgeCountOrderByAggregateInputObjectSchema } from './EdgeCountOrderByAggregateInput.schema';
import { EdgeAvgOrderByAggregateInputObjectSchema } from './EdgeAvgOrderByAggregateInput.schema';
import { EdgeMaxOrderByAggregateInputObjectSchema } from './EdgeMaxOrderByAggregateInput.schema';
import { EdgeMinOrderByAggregateInputObjectSchema } from './EdgeMinOrderByAggregateInput.schema';
import { EdgeSumOrderByAggregateInputObjectSchema } from './EdgeSumOrderByAggregateInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.EdgeOrderByWithAggregationInput> = z
    .object({
        id: z.lazy(() => SortOrderSchema).optional(),
        fromNodeId: z.lazy(() => SortOrderSchema).optional(),
        toNodeId: z.lazy(() => SortOrderSchema).optional(),
        _count: z.lazy(() => EdgeCountOrderByAggregateInputObjectSchema).optional(),
        _avg: z.lazy(() => EdgeAvgOrderByAggregateInputObjectSchema).optional(),
        _max: z.lazy(() => EdgeMaxOrderByAggregateInputObjectSchema).optional(),
        _min: z.lazy(() => EdgeMinOrderByAggregateInputObjectSchema).optional(),
        _sum: z.lazy(() => EdgeSumOrderByAggregateInputObjectSchema).optional(),
    })
    .strict();

export const EdgeOrderByWithAggregationInputObjectSchema = Schema;
