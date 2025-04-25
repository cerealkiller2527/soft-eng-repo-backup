import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.NodeSumOrderByAggregateInput> = z
    .object({
        id: z.lazy(() => SortOrderSchema).optional(),
        lat: z.lazy(() => SortOrderSchema).optional(),
        long: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const NodeSumOrderByAggregateInputObjectSchema = Schema;
