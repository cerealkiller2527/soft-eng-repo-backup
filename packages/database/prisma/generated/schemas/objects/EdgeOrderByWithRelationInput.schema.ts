import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { NodeOrderByWithRelationInputObjectSchema } from './NodeOrderByWithRelationInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.EdgeOrderByWithRelationInput> = z
    .object({
        id: z.lazy(() => SortOrderSchema).optional(),
        fromNodeId: z.lazy(() => SortOrderSchema).optional(),
        toNodeId: z.lazy(() => SortOrderSchema).optional(),
        fromNode: z.lazy(() => NodeOrderByWithRelationInputObjectSchema).optional(),
        toNode: z.lazy(() => NodeOrderByWithRelationInputObjectSchema).optional(),
    })
    .strict();

export const EdgeOrderByWithRelationInputObjectSchema = Schema;
