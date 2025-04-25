import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.SecurityMaxOrderByAggregateInput> = z
    .object({
        id: z.lazy(() => SortOrderSchema).optional(),
        location: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const SecurityMaxOrderByAggregateInputObjectSchema = Schema;
