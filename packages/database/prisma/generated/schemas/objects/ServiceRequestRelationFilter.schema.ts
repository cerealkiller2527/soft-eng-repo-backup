import { z } from 'zod';
import { ServiceRequestWhereInputObjectSchema } from './ServiceRequestWhereInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.ServiceRequestRelationFilter> = z
    .object({
        is: z
            .lazy(() => ServiceRequestWhereInputObjectSchema)
            .optional()
            .nullable(),
        isNot: z
            .lazy(() => ServiceRequestWhereInputObjectSchema)
            .optional()
            .nullable(),
    })
    .strict();

export const ServiceRequestRelationFilterObjectSchema = Schema;
