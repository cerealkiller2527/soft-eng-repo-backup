import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.EdgeMinOrderByAggregateInput> = z
    .object({
        id: z.lazy(() => SortOrderSchema).optional(),
        fromNodeId: z.lazy(() => SortOrderSchema).optional(),
        toNodeId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const EdgeMinOrderByAggregateInputObjectSchema = Schema;
