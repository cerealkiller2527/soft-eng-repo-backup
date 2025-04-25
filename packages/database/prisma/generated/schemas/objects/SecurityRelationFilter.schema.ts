import { z } from 'zod';
import { SecurityWhereInputObjectSchema } from './SecurityWhereInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.SecurityRelationFilter> = z
    .object({
        is: z
            .lazy(() => SecurityWhereInputObjectSchema)
            .optional()
            .nullable(),
        isNot: z
            .lazy(() => SecurityWhereInputObjectSchema)
            .optional()
            .nullable(),
    })
    .strict();

export const SecurityRelationFilterObjectSchema = Schema;
