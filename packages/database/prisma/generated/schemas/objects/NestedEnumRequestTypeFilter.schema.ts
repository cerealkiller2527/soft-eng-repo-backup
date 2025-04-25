import { z } from 'zod';
import { RequestTypeSchema } from '../enums/RequestType.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.NestedEnumRequestTypeFilter> = z
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
                z.lazy(() => NestedEnumRequestTypeFilterObjectSchema),
            ])
            .optional(),
    })
    .strict();

export const NestedEnumRequestTypeFilterObjectSchema = Schema;
