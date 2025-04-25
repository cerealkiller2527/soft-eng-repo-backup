import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.NodeMinOrderByAggregateInput> = z
    .object({
        id: z.lazy(() => SortOrderSchema).optional(),
        type: z.lazy(() => SortOrderSchema).optional(),
        description: z.lazy(() => SortOrderSchema).optional(),
        lat: z.lazy(() => SortOrderSchema).optional(),
        long: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const NodeMinOrderByAggregateInputObjectSchema = Schema;
