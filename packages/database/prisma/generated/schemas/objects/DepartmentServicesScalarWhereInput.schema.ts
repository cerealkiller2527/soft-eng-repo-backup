import { z } from 'zod';
import { IntFilterObjectSchema } from './IntFilter.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.DepartmentServicesScalarWhereInput> = z
    .object({
        AND: z
            .union([
                z.lazy(() => DepartmentServicesScalarWhereInputObjectSchema),
                z.lazy(() => DepartmentServicesScalarWhereInputObjectSchema).array(),
            ])
            .optional(),
        OR: z
            .lazy(() => DepartmentServicesScalarWhereInputObjectSchema)
            .array()
            .optional(),
        NOT: z
            .union([
                z.lazy(() => DepartmentServicesScalarWhereInputObjectSchema),
                z.lazy(() => DepartmentServicesScalarWhereInputObjectSchema).array(),
            ])
            .optional(),
        departmentID: z.union([z.lazy(() => IntFilterObjectSchema), z.number()]).optional(),
        serviceID: z.union([z.lazy(() => IntFilterObjectSchema), z.number()]).optional(),
    })
    .strict();

export const DepartmentServicesScalarWhereInputObjectSchema = Schema;
