import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { EdgeOrderByRelationAggregateInputObjectSchema } from './EdgeOrderByRelationAggregateInput.schema';
import { LocationOrderByRelationAggregateInputObjectSchema } from './LocationOrderByRelationAggregateInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.NodeOrderByWithRelationInput> = z
    .object({
        id: z.lazy(() => SortOrderSchema).optional(),
        type: z.lazy(() => SortOrderSchema).optional(),
        description: z.lazy(() => SortOrderSchema).optional(),
        lat: z.lazy(() => SortOrderSchema).optional(),
        long: z.lazy(() => SortOrderSchema).optional(),
        fromEdge: z.lazy(() => EdgeOrderByRelationAggregateInputObjectSchema).optional(),
        toEdge: z.lazy(() => EdgeOrderByRelationAggregateInputObjectSchema).optional(),
        Location: z.lazy(() => LocationOrderByRelationAggregateInputObjectSchema).optional(),
    })
    .strict();

export const NodeOrderByWithRelationInputObjectSchema = Schema;
