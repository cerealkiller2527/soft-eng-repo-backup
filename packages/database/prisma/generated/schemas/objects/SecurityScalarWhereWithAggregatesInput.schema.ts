import { z } from 'zod';
import { IntWithAggregatesFilterObjectSchema } from './IntWithAggregatesFilter.schema';
import { StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.SecurityScalarWhereWithAggregatesInput> = z
    .object({
        AND: z
            .union([
                z.lazy(() => SecurityScalarWhereWithAggregatesInputObjectSchema),
                z.lazy(() => SecurityScalarWhereWithAggregatesInputObjectSchema).array(),
            ])
            .optional(),
        OR: z
            .lazy(() => SecurityScalarWhereWithAggregatesInputObjectSchema)
            .array()
            .optional(),
        NOT: z
            .union([
                z.lazy(() => SecurityScalarWhereWithAggregatesInputObjectSchema),
                z.lazy(() => SecurityScalarWhereWithAggregatesInputObjectSchema).array(),
            ])
            .optional(),
        id: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number()]).optional(),
        location: z
            .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
            .optional(),
    })
    .strict();

export const SecurityScalarWhereWithAggregatesInputObjectSchema = Schema;
