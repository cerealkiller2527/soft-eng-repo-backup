import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.LanguageMaxOrderByAggregateInput> = z
    .object({
        id: z.lazy(() => SortOrderSchema).optional(),
        location: z.lazy(() => SortOrderSchema).optional(),
        language: z.lazy(() => SortOrderSchema).optional(),
        startTime: z.lazy(() => SortOrderSchema).optional(),
        endTime: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const LanguageMaxOrderByAggregateInputObjectSchema = Schema;
