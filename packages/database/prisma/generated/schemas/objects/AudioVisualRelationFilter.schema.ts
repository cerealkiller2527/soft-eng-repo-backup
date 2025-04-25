import { z } from 'zod';
import { AudioVisualWhereInputObjectSchema } from './AudioVisualWhereInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.AudioVisualRelationFilter> = z
    .object({
        is: z
            .lazy(() => AudioVisualWhereInputObjectSchema)
            .optional()
            .nullable(),
        isNot: z
            .lazy(() => AudioVisualWhereInputObjectSchema)
            .optional()
            .nullable(),
    })
    .strict();

export const AudioVisualRelationFilterObjectSchema = Schema;
