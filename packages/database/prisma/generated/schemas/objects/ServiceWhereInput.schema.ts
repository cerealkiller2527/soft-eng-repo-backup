import { z } from 'zod';
import { IntFilterObjectSchema } from './IntFilter.schema';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { DepartmentServicesListRelationFilterObjectSchema } from './DepartmentServicesListRelationFilter.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.ServiceWhereInput> = z
    .object({
        AND: z
            .union([
                z.lazy(() => ServiceWhereInputObjectSchema),
                z.lazy(() => ServiceWhereInputObjectSchema).array(),
            ])
            .optional(),
        OR: z
            .lazy(() => ServiceWhereInputObjectSchema)
            .array()
            .optional(),
        NOT: z
            .union([
                z.lazy(() => ServiceWhereInputObjectSchema),
                z.lazy(() => ServiceWhereInputObjectSchema).array(),
            ])
            .optional(),
        id: z.union([z.lazy(() => IntFilterObjectSchema), z.number()]).optional(),
        name: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
        DepartmentServices: z
            .lazy(() => DepartmentServicesListRelationFilterObjectSchema)
            .optional(),
    })
    .strict();

export const ServiceWhereInputObjectSchema = Schema;
