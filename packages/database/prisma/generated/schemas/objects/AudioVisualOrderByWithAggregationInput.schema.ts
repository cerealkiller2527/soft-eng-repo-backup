import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { AudioVisualCountOrderByAggregateInputObjectSchema } from './AudioVisualCountOrderByAggregateInput.schema';
import { AudioVisualAvgOrderByAggregateInputObjectSchema } from './AudioVisualAvgOrderByAggregateInput.schema';
import { AudioVisualMaxOrderByAggregateInputObjectSchema } from './AudioVisualMaxOrderByAggregateInput.schema';
import { AudioVisualMinOrderByAggregateInputObjectSchema } from './AudioVisualMinOrderByAggregateInput.schema';
import { AudioVisualSumOrderByAggregateInputObjectSchema } from './AudioVisualSumOrderByAggregateInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.AudioVisualOrderByWithAggregationInput> = z
    .object({
        id: z.lazy(() => SortOrderSchema).optional(),
        location: z.lazy(() => SortOrderSchema).optional(),
        deadline: z.lazy(() => SortOrderSchema).optional(),
        audiovisualType: z.lazy(() => SortOrderSchema).optional(),
        _count: z.lazy(() => AudioVisualCountOrderByAggregateInputObjectSchema).optional(),
        _avg: z.lazy(() => AudioVisualAvgOrderByAggregateInputObjectSchema).optional(),
        _max: z.lazy(() => AudioVisualMaxOrderByAggregateInputObjectSchema).optional(),
        _min: z.lazy(() => AudioVisualMinOrderByAggregateInputObjectSchema).optional(),
        _sum: z.lazy(() => AudioVisualSumOrderByAggregateInputObjectSchema).optional(),
    })
    .strict();

export const AudioVisualOrderByWithAggregationInputObjectSchema = Schema;
