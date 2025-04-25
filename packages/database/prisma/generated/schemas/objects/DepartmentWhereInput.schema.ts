import { z } from 'zod';
import { IntFilterObjectSchema } from './IntFilter.schema';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { DepartmentServicesListRelationFilterObjectSchema } from './DepartmentServicesListRelationFilter.schema';
import { LocationListRelationFilterObjectSchema } from './LocationListRelationFilter.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.DepartmentWhereInput> = z
    .object({
        AND: z
            .union([
                z.lazy(() => DepartmentWhereInputObjectSchema),
                z.lazy(() => DepartmentWhereInputObjectSchema).array(),
            ])
            .optional(),
        OR: z
            .lazy(() => DepartmentWhereInputObjectSchema)
            .array()
            .optional(),
        NOT: z
            .union([
                z.lazy(() => DepartmentWhereInputObjectSchema),
                z.lazy(() => DepartmentWhereInputObjectSchema).array(),
            ])
            .optional(),
        id: z.union([z.lazy(() => IntFilterObjectSchema), z.number()]).optional(),
        name: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
        description: z
            .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
            .optional()
            .nullable(),
        phoneNumber: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
        DepartmentServices: z
            .lazy(() => DepartmentServicesListRelationFilterObjectSchema)
            .optional(),
        Location: z.lazy(() => LocationListRelationFilterObjectSchema).optional(),
    })
    .strict();

export const DepartmentWhereInputObjectSchema = Schema;
