import { z } from 'zod';
import { IntWithAggregatesFilterObjectSchema } from './IntWithAggregatesFilter.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.EdgeScalarWhereWithAggregatesInput> = z
    .object({
        AND: z
            .union([
                z.lazy(() => EdgeScalarWhereWithAggregatesInputObjectSchema),
                z.lazy(() => EdgeScalarWhereWithAggregatesInputObjectSchema).array(),
            ])
            .optional(),
        OR: z
            .lazy(() => EdgeScalarWhereWithAggregatesInputObjectSchema)
            .array()
            .optional(),
        NOT: z
            .union([
                z.lazy(() => EdgeScalarWhereWithAggregatesInputObjectSchema),
                z.lazy(() => EdgeScalarWhereWithAggregatesInputObjectSchema).array(),
            ])
            .optional(),
        id: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number()]).optional(),
        fromNodeId: z
            .union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number()])
            .optional(),
        toNodeId: z
            .union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number()])
            .optional(),
    })
    .strict();

export const EdgeScalarWhereWithAggregatesInputObjectSchema = Schema;
