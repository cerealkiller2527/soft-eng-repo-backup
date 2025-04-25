import { z } from 'zod';
import { IntWithAggregatesFilterObjectSchema } from './IntWithAggregatesFilter.schema';
import { StringNullableWithAggregatesFilterObjectSchema } from './StringNullableWithAggregatesFilter.schema';
import { IntNullableWithAggregatesFilterObjectSchema } from './IntNullableWithAggregatesFilter.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.LocationScalarWhereWithAggregatesInput> = z
    .object({
        AND: z
            .union([
                z.lazy(() => LocationScalarWhereWithAggregatesInputObjectSchema),
                z.lazy(() => LocationScalarWhereWithAggregatesInputObjectSchema).array(),
            ])
            .optional(),
        OR: z
            .lazy(() => LocationScalarWhereWithAggregatesInputObjectSchema)
            .array()
            .optional(),
        NOT: z
            .union([
                z.lazy(() => LocationScalarWhereWithAggregatesInputObjectSchema),
                z.lazy(() => LocationScalarWhereWithAggregatesInputObjectSchema).array(),
            ])
            .optional(),
        id: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number()]).optional(),
        floor: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number()]).optional(),
        suite: z
            .union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()])
            .optional()
            .nullable(),
        buildingId: z
            .union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number()])
            .optional(),
        departmentId: z
            .union([z.lazy(() => IntNullableWithAggregatesFilterObjectSchema), z.number()])
            .optional()
            .nullable(),
        nodeID: z
            .union([z.lazy(() => IntNullableWithAggregatesFilterObjectSchema), z.number()])
            .optional()
            .nullable(),
    })
    .strict();

export const LocationScalarWhereWithAggregatesInputObjectSchema = Schema;
