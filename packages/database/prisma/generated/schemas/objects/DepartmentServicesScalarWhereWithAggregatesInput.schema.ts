import { z } from 'zod';
import { IntWithAggregatesFilterObjectSchema } from './IntWithAggregatesFilter.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.DepartmentServicesScalarWhereWithAggregatesInput> = z
    .object({
        AND: z
            .union([
                z.lazy(() => DepartmentServicesScalarWhereWithAggregatesInputObjectSchema),
                z.lazy(() => DepartmentServicesScalarWhereWithAggregatesInputObjectSchema).array(),
            ])
            .optional(),
        OR: z
            .lazy(() => DepartmentServicesScalarWhereWithAggregatesInputObjectSchema)
            .array()
            .optional(),
        NOT: z
            .union([
                z.lazy(() => DepartmentServicesScalarWhereWithAggregatesInputObjectSchema),
                z.lazy(() => DepartmentServicesScalarWhereWithAggregatesInputObjectSchema).array(),
            ])
            .optional(),
        departmentID: z
            .union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number()])
            .optional(),
        serviceID: z
            .union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number()])
            .optional(),
    })
    .strict();

export const DepartmentServicesScalarWhereWithAggregatesInputObjectSchema = Schema;
