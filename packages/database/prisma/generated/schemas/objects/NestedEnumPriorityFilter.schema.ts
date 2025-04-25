import { z } from 'zod';
import { PrioritySchema } from '../enums/Priority.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.NestedEnumPriorityFilter> = z
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
                z.lazy(() => NestedEnumPriorityFilterObjectSchema),
            ])
            .optional(),
    })
    .strict();

export const NestedEnumPriorityFilterObjectSchema = Schema;
