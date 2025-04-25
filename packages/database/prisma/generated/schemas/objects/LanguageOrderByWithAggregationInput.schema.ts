import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { LanguageCountOrderByAggregateInputObjectSchema } from './LanguageCountOrderByAggregateInput.schema';
import { LanguageAvgOrderByAggregateInputObjectSchema } from './LanguageAvgOrderByAggregateInput.schema';
import { LanguageMaxOrderByAggregateInputObjectSchema } from './LanguageMaxOrderByAggregateInput.schema';
import { LanguageMinOrderByAggregateInputObjectSchema } from './LanguageMinOrderByAggregateInput.schema';
import { LanguageSumOrderByAggregateInputObjectSchema } from './LanguageSumOrderByAggregateInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.LanguageOrderByWithAggregationInput> = z
    .object({
        id: z.lazy(() => SortOrderSchema).optional(),
        location: z.lazy(() => SortOrderSchema).optional(),
        language: z.lazy(() => SortOrderSchema).optional(),
        startTime: z.lazy(() => SortOrderSchema).optional(),
        endTime: z.lazy(() => SortOrderSchema).optional(),
        _count: z.lazy(() => LanguageCountOrderByAggregateInputObjectSchema).optional(),
        _avg: z.lazy(() => LanguageAvgOrderByAggregateInputObjectSchema).optional(),
        _max: z.lazy(() => LanguageMaxOrderByAggregateInputObjectSchema).optional(),
        _min: z.lazy(() => LanguageMinOrderByAggregateInputObjectSchema).optional(),
        _sum: z.lazy(() => LanguageSumOrderByAggregateInputObjectSchema).optional(),
    })
    .strict();

export const LanguageOrderByWithAggregationInputObjectSchema = Schema;
