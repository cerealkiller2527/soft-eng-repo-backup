import { z } from 'zod';
import { IntWithAggregatesFilterObjectSchema } from './IntWithAggregatesFilter.schema';
import { StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { StringNullableWithAggregatesFilterObjectSchema } from './StringNullableWithAggregatesFilter.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.DepartmentScalarWhereWithAggregatesInput> = z
    .object({
        AND: z
            .union([
                z.lazy(() => DepartmentScalarWhereWithAggregatesInputObjectSchema),
                z.lazy(() => DepartmentScalarWhereWithAggregatesInputObjectSchema).array(),
            ])
            .optional(),
        OR: z
            .lazy(() => DepartmentScalarWhereWithAggregatesInputObjectSchema)
            .array()
            .optional(),
        NOT: z
            .union([
                z.lazy(() => DepartmentScalarWhereWithAggregatesInputObjectSchema),
                z.lazy(() => DepartmentScalarWhereWithAggregatesInputObjectSchema).array(),
            ])
            .optional(),
        id: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number()]).optional(),
        name: z
            .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
            .optional(),
        description: z
            .union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()])
            .optional()
            .nullable(),
        phoneNumber: z
            .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
            .optional(),
    })
    .strict();

export const DepartmentScalarWhereWithAggregatesInputObjectSchema = Schema;
