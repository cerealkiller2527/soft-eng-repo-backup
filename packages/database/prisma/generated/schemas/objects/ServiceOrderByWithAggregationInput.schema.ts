import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { ServiceCountOrderByAggregateInputObjectSchema } from './ServiceCountOrderByAggregateInput.schema';
import { ServiceAvgOrderByAggregateInputObjectSchema } from './ServiceAvgOrderByAggregateInput.schema';
import { ServiceMaxOrderByAggregateInputObjectSchema } from './ServiceMaxOrderByAggregateInput.schema';
import { ServiceMinOrderByAggregateInputObjectSchema } from './ServiceMinOrderByAggregateInput.schema';
import { ServiceSumOrderByAggregateInputObjectSchema } from './ServiceSumOrderByAggregateInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.ServiceOrderByWithAggregationInput> = z
    .object({
        id: z.lazy(() => SortOrderSchema).optional(),
        name: z.lazy(() => SortOrderSchema).optional(),
        _count: z.lazy(() => ServiceCountOrderByAggregateInputObjectSchema).optional(),
        _avg: z.lazy(() => ServiceAvgOrderByAggregateInputObjectSchema).optional(),
        _max: z.lazy(() => ServiceMaxOrderByAggregateInputObjectSchema).optional(),
        _min: z.lazy(() => ServiceMinOrderByAggregateInputObjectSchema).optional(),
        _sum: z.lazy(() => ServiceSumOrderByAggregateInputObjectSchema).optional(),
    })
    .strict();

export const ServiceOrderByWithAggregationInputObjectSchema = Schema;
