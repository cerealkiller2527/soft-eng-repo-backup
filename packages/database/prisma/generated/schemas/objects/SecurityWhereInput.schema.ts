import { z } from 'zod';
import { IntFilterObjectSchema } from './IntFilter.schema';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { ServiceRequestRelationFilterObjectSchema } from './ServiceRequestRelationFilter.schema';
import { ServiceRequestWhereInputObjectSchema } from './ServiceRequestWhereInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.SecurityWhereInput> = z
    .object({
        AND: z
            .union([
                z.lazy(() => SecurityWhereInputObjectSchema),
                z.lazy(() => SecurityWhereInputObjectSchema).array(),
            ])
            .optional(),
        OR: z
            .lazy(() => SecurityWhereInputObjectSchema)
            .array()
            .optional(),
        NOT: z
            .union([
                z.lazy(() => SecurityWhereInputObjectSchema),
                z.lazy(() => SecurityWhereInputObjectSchema).array(),
            ])
            .optional(),
        id: z.union([z.lazy(() => IntFilterObjectSchema), z.number()]).optional(),
        location: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
        serviceRequest: z
            .union([
                z.lazy(() => ServiceRequestRelationFilterObjectSchema),
                z.lazy(() => ServiceRequestWhereInputObjectSchema),
            ])
            .optional(),
    })
    .strict();

export const SecurityWhereInputObjectSchema = Schema;
