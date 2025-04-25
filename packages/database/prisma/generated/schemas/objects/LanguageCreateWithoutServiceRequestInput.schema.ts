import { z } from 'zod';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.LanguageCreateWithoutServiceRequestInput> = z
    .object({
        location: z.string(),
        language: z.string(),
        startTime: z.coerce.date(),
        endTime: z.coerce.date(),
    })
    .strict();

export const LanguageCreateWithoutServiceRequestInputObjectSchema = Schema;
