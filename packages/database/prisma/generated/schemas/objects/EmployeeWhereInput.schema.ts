import { z } from 'zod';
import { IntFilterObjectSchema } from './IntFilter.schema';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { EnumRequestTypeNullableListFilterObjectSchema } from './EnumRequestTypeNullableListFilter.schema';
import { StringNullableListFilterObjectSchema } from './StringNullableListFilter.schema';
import { ServiceRequestListRelationFilterObjectSchema } from './ServiceRequestListRelationFilter.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.EmployeeWhereInput> = z
    .object({
        AND: z
            .union([
                z.lazy(() => EmployeeWhereInputObjectSchema),
                z.lazy(() => EmployeeWhereInputObjectSchema).array(),
            ])
            .optional(),
        OR: z
            .lazy(() => EmployeeWhereInputObjectSchema)
            .array()
            .optional(),
        NOT: z
            .union([
                z.lazy(() => EmployeeWhereInputObjectSchema),
                z.lazy(() => EmployeeWhereInputObjectSchema).array(),
            ])
            .optional(),
        id: z.union([z.lazy(() => IntFilterObjectSchema), z.number()]).optional(),
        name: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
        employeeType: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
        canService: z.lazy(() => EnumRequestTypeNullableListFilterObjectSchema).optional(),
        language: z.lazy(() => StringNullableListFilterObjectSchema).optional(),
        ServiceRequest: z.lazy(() => ServiceRequestListRelationFilterObjectSchema).optional(),
    })
    .strict();

export const EmployeeWhereInputObjectSchema = Schema;
