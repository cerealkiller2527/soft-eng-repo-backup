import { z } from 'zod';
import { IntWithAggregatesFilterObjectSchema } from './IntWithAggregatesFilter.schema';
import { StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { EnumRequestTypeNullableListFilterObjectSchema } from './EnumRequestTypeNullableListFilter.schema';
import { StringNullableListFilterObjectSchema } from './StringNullableListFilter.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.EmployeeScalarWhereWithAggregatesInput> = z
    .object({
        AND: z
            .union([
                z.lazy(() => EmployeeScalarWhereWithAggregatesInputObjectSchema),
                z.lazy(() => EmployeeScalarWhereWithAggregatesInputObjectSchema).array(),
            ])
            .optional(),
        OR: z
            .lazy(() => EmployeeScalarWhereWithAggregatesInputObjectSchema)
            .array()
            .optional(),
        NOT: z
            .union([
                z.lazy(() => EmployeeScalarWhereWithAggregatesInputObjectSchema),
                z.lazy(() => EmployeeScalarWhereWithAggregatesInputObjectSchema).array(),
            ])
            .optional(),
        id: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number()]).optional(),
        name: z
            .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
            .optional(),
        employeeType: z
            .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
            .optional(),
        canService: z.lazy(() => EnumRequestTypeNullableListFilterObjectSchema).optional(),
        language: z.lazy(() => StringNullableListFilterObjectSchema).optional(),
    })
    .strict();

export const EmployeeScalarWhereWithAggregatesInputObjectSchema = Schema;
