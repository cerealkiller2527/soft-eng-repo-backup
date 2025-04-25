import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.BuildingSumOrderByAggregateInput> = z
    .object({
        id: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const BuildingSumOrderByAggregateInputObjectSchema = Schema;
