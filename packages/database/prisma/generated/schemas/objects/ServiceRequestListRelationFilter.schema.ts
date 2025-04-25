import { z } from 'zod';
import { ServiceRequestWhereInputObjectSchema } from './ServiceRequestWhereInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.ServiceRequestListRelationFilter> = z
    .object({
        every: z.lazy(() => ServiceRequestWhereInputObjectSchema).optional(),
        some: z.lazy(() => ServiceRequestWhereInputObjectSchema).optional(),
        none: z.lazy(() => ServiceRequestWhereInputObjectSchema).optional(),
    })
    .strict();

export const ServiceRequestListRelationFilterObjectSchema = Schema;
