import { z } from 'zod';
import { nodeTypeSchema } from '../enums/nodeType.schema';
import { NestedEnumnodeTypeWithAggregatesFilterObjectSchema } from './NestedEnumnodeTypeWithAggregatesFilter.schema';
import { NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumnodeTypeFilterObjectSchema } from './NestedEnumnodeTypeFilter.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.EnumnodeTypeWithAggregatesFilter> = z
    .object({
        equals: z.lazy(() => nodeTypeSchema).optional(),
        in: z
            .union([z.lazy(() => nodeTypeSchema).array(), z.lazy(() => nodeTypeSchema)])
            .optional(),
        notIn: z
            .union([z.lazy(() => nodeTypeSchema).array(), z.lazy(() => nodeTypeSchema)])
            .optional(),
        not: z
            .union([
                z.lazy(() => nodeTypeSchema),
                z.lazy(() => NestedEnumnodeTypeWithAggregatesFilterObjectSchema),
            ])
            .optional(),
        _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
        _min: z.lazy(() => NestedEnumnodeTypeFilterObjectSchema).optional(),
        _max: z.lazy(() => NestedEnumnodeTypeFilterObjectSchema).optional(),
    })
    .strict();

export const EnumnodeTypeWithAggregatesFilterObjectSchema = Schema;
