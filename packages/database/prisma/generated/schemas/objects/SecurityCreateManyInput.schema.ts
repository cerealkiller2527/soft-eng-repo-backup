import { z } from 'zod';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.SecurityCreateManyInput> = z
    .object({
        id: z.number(),
        location: z.string(),
    })
    .strict();

export const SecurityCreateManyInputObjectSchema = Schema;
