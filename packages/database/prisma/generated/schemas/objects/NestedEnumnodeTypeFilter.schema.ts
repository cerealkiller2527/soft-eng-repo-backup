import { z } from 'zod';
import { nodeTypeSchema } from '../enums/nodeType.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.NestedEnumnodeTypeFilter> = z
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
                z.lazy(() => NestedEnumnodeTypeFilterObjectSchema),
            ])
            .optional(),
    })
    .strict();

export const NestedEnumnodeTypeFilterObjectSchema = Schema;
