import { z } from 'zod';
import { RequestTypeSchema } from '../enums/RequestType.schema';
import { NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumRequestTypeFilterObjectSchema } from './NestedEnumRequestTypeFilter.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.NestedEnumRequestTypeWithAggregatesFilter> = z
    .object({
        equals: z.lazy(() => RequestTypeSchema).optional(),
        in: z
            .union([z.lazy(() => RequestTypeSchema).array(), z.lazy(() => RequestTypeSchema)])
            .optional(),
        notIn: z
            .union([z.lazy(() => RequestTypeSchema).array(), z.lazy(() => RequestTypeSchema)])
            .optional(),
        not: z
            .union([
                z.lazy(() => RequestTypeSchema),
                z.lazy(() => NestedEnumRequestTypeWithAggregatesFilterObjectSchema),
            ])
            .optional(),
        _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
        _min: z.lazy(() => NestedEnumRequestTypeFilterObjectSchema).optional(),
        _max: z.lazy(() => NestedEnumRequestTypeFilterObjectSchema).optional(),
    })
    .strict();

export const NestedEnumRequestTypeWithAggregatesFilterObjectSchema = Schema;
