import { z } from 'zod';
import { IntWithAggregatesFilterObjectSchema } from './IntWithAggregatesFilter.schema';
import { EnumnodeTypeWithAggregatesFilterObjectSchema } from './EnumnodeTypeWithAggregatesFilter.schema';
import { nodeTypeSchema } from '../enums/nodeType.schema';
import { StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { FloatWithAggregatesFilterObjectSchema } from './FloatWithAggregatesFilter.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.NodeScalarWhereWithAggregatesInput> = z
    .object({
        AND: z
            .union([
                z.lazy(() => NodeScalarWhereWithAggregatesInputObjectSchema),
                z.lazy(() => NodeScalarWhereWithAggregatesInputObjectSchema).array(),
            ])
            .optional(),
        OR: z
            .lazy(() => NodeScalarWhereWithAggregatesInputObjectSchema)
            .array()
            .optional(),
        NOT: z
            .union([
                z.lazy(() => NodeScalarWhereWithAggregatesInputObjectSchema),
                z.lazy(() => NodeScalarWhereWithAggregatesInputObjectSchema).array(),
            ])
            .optional(),
        id: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number()]).optional(),
        type: z
            .union([
                z.lazy(() => EnumnodeTypeWithAggregatesFilterObjectSchema),
                z.lazy(() => nodeTypeSchema),
            ])
            .optional(),
        description: z
            .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
            .optional(),
        lat: z.union([z.lazy(() => FloatWithAggregatesFilterObjectSchema), z.number()]).optional(),
        long: z.union([z.lazy(() => FloatWithAggregatesFilterObjectSchema), z.number()]).optional(),
    })
    .strict();

export const NodeScalarWhereWithAggregatesInputObjectSchema = Schema;
