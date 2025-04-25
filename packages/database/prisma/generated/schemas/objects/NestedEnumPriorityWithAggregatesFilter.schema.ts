import { z } from 'zod';
import { PrioritySchema } from '../enums/Priority.schema';
import { NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumPriorityFilterObjectSchema } from './NestedEnumPriorityFilter.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.NestedEnumPriorityWithAggregatesFilter> = z
    .object({
        equals: z.lazy(() => PrioritySchema).optional(),
        in: z
            .union([z.lazy(() => PrioritySchema).array(), z.lazy(() => PrioritySchema)])
            .optional(),
        notIn: z
            .union([z.lazy(() => PrioritySchema).array(), z.lazy(() => PrioritySchema)])
            .optional(),
        not: z
            .union([
                z.lazy(() => PrioritySchema),
                z.lazy(() => NestedEnumPriorityWithAggregatesFilterObjectSchema),
            ])
            .optional(),
        _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
        _min: z.lazy(() => NestedEnumPriorityFilterObjectSchema).optional(),
        _max: z.lazy(() => NestedEnumPriorityFilterObjectSchema).optional(),
    })
    .strict();

export const NestedEnumPriorityWithAggregatesFilterObjectSchema = Schema;
