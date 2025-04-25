import { z } from 'zod';
import { ExternalTransportationWhereInputObjectSchema } from './ExternalTransportationWhereInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.ExternalTransportationRelationFilter> = z
    .object({
        is: z
            .lazy(() => ExternalTransportationWhereInputObjectSchema)
            .optional()
            .nullable(),
        isNot: z
            .lazy(() => ExternalTransportationWhereInputObjectSchema)
            .optional()
            .nullable(),
    })
    .strict();

export const ExternalTransportationRelationFilterObjectSchema = Schema;
