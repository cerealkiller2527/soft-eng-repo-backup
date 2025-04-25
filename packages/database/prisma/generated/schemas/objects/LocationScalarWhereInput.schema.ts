import { z } from 'zod';
import { IntFilterObjectSchema } from './IntFilter.schema';
import { StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { IntNullableFilterObjectSchema } from './IntNullableFilter.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.LocationScalarWhereInput> = z
    .object({
        AND: z
            .union([
                z.lazy(() => LocationScalarWhereInputObjectSchema),
                z.lazy(() => LocationScalarWhereInputObjectSchema).array(),
            ])
            .optional(),
        OR: z
            .lazy(() => LocationScalarWhereInputObjectSchema)
            .array()
            .optional(),
        NOT: z
            .union([
                z.lazy(() => LocationScalarWhereInputObjectSchema),
                z.lazy(() => LocationScalarWhereInputObjectSchema).array(),
            ])
            .optional(),
        id: z.union([z.lazy(() => IntFilterObjectSchema), z.number()]).optional(),
        floor: z.union([z.lazy(() => IntFilterObjectSchema), z.number()]).optional(),
        suite: z
            .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
            .optional()
            .nullable(),
        buildingId: z.union([z.lazy(() => IntFilterObjectSchema), z.number()]).optional(),
        departmentId: z
            .union([z.lazy(() => IntNullableFilterObjectSchema), z.number()])
            .optional()
            .nullable(),
        nodeID: z
            .union([z.lazy(() => IntNullableFilterObjectSchema), z.number()])
            .optional()
            .nullable(),
    })
    .strict();

export const LocationScalarWhereInputObjectSchema = Schema;
