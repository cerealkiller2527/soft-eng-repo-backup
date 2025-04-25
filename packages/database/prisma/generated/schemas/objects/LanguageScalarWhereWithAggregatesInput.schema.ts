import { z } from 'zod';
import { IntWithAggregatesFilterObjectSchema } from './IntWithAggregatesFilter.schema';
import { StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.LanguageScalarWhereWithAggregatesInput> = z
    .object({
        AND: z
            .union([
                z.lazy(() => LanguageScalarWhereWithAggregatesInputObjectSchema),
                z.lazy(() => LanguageScalarWhereWithAggregatesInputObjectSchema).array(),
            ])
            .optional(),
        OR: z
            .lazy(() => LanguageScalarWhereWithAggregatesInputObjectSchema)
            .array()
            .optional(),
        NOT: z
            .union([
                z.lazy(() => LanguageScalarWhereWithAggregatesInputObjectSchema),
                z.lazy(() => LanguageScalarWhereWithAggregatesInputObjectSchema).array(),
            ])
            .optional(),
        id: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number()]).optional(),
        location: z
            .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
            .optional(),
        language: z
            .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
            .optional(),
        startTime: z
            .union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()])
            .optional(),
        endTime: z
            .union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()])
            .optional(),
    })
    .strict();

export const LanguageScalarWhereWithAggregatesInputObjectSchema = Schema;
