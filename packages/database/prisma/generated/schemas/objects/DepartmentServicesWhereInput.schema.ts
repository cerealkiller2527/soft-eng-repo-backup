import { z } from 'zod';
import { IntFilterObjectSchema } from './IntFilter.schema';
import { DepartmentRelationFilterObjectSchema } from './DepartmentRelationFilter.schema';
import { DepartmentWhereInputObjectSchema } from './DepartmentWhereInput.schema';
import { ServiceRelationFilterObjectSchema } from './ServiceRelationFilter.schema';
import { ServiceWhereInputObjectSchema } from './ServiceWhereInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.DepartmentServicesWhereInput> = z
    .object({
        AND: z
            .union([
                z.lazy(() => DepartmentServicesWhereInputObjectSchema),
                z.lazy(() => DepartmentServicesWhereInputObjectSchema).array(),
            ])
            .optional(),
        OR: z
            .lazy(() => DepartmentServicesWhereInputObjectSchema)
            .array()
            .optional(),
        NOT: z
            .union([
                z.lazy(() => DepartmentServicesWhereInputObjectSchema),
                z.lazy(() => DepartmentServicesWhereInputObjectSchema).array(),
            ])
            .optional(),
        departmentID: z.union([z.lazy(() => IntFilterObjectSchema), z.number()]).optional(),
        serviceID: z.union([z.lazy(() => IntFilterObjectSchema), z.number()]).optional(),
        department: z
            .union([
                z.lazy(() => DepartmentRelationFilterObjectSchema),
                z.lazy(() => DepartmentWhereInputObjectSchema),
            ])
            .optional(),
        service: z
            .union([
                z.lazy(() => ServiceRelationFilterObjectSchema),
                z.lazy(() => ServiceWhereInputObjectSchema),
            ])
            .optional(),
    })
    .strict();

export const DepartmentServicesWhereInputObjectSchema = Schema;
