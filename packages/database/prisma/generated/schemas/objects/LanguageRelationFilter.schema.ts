import { z } from 'zod';
import { LanguageWhereInputObjectSchema } from './LanguageWhereInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.LanguageRelationFilter> = z
    .object({
        is: z
            .lazy(() => LanguageWhereInputObjectSchema)
            .optional()
            .nullable(),
        isNot: z
            .lazy(() => LanguageWhereInputObjectSchema)
            .optional()
            .nullable(),
    })
    .strict();

export const LanguageRelationFilterObjectSchema = Schema;
