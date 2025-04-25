import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { NodeCountOrderByAggregateInputObjectSchema } from './NodeCountOrderByAggregateInput.schema';
import { NodeAvgOrderByAggregateInputObjectSchema } from './NodeAvgOrderByAggregateInput.schema';
import { NodeMaxOrderByAggregateInputObjectSchema } from './NodeMaxOrderByAggregateInput.schema';
import { NodeMinOrderByAggregateInputObjectSchema } from './NodeMinOrderByAggregateInput.schema';
import { NodeSumOrderByAggregateInputObjectSchema } from './NodeSumOrderByAggregateInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.NodeOrderByWithAggregationInput> = z
    .object({
        id: z.lazy(() => SortOrderSchema).optional(),
        type: z.lazy(() => SortOrderSchema).optional(),
        description: z.lazy(() => SortOrderSchema).optional(),
        lat: z.lazy(() => SortOrderSchema).optional(),
        long: z.lazy(() => SortOrderSchema).optional(),
        _count: z.lazy(() => NodeCountOrderByAggregateInputObjectSchema).optional(),
        _avg: z.lazy(() => NodeAvgOrderByAggregateInputObjectSchema).optional(),
        _max: z.lazy(() => NodeMaxOrderByAggregateInputObjectSchema).optional(),
        _min: z.lazy(() => NodeMinOrderByAggregateInputObjectSchema).optional(),
        _sum: z.lazy(() => NodeSumOrderByAggregateInputObjectSchema).optional(),
    })
    .strict();

export const NodeOrderByWithAggregationInputObjectSchema = Schema;
