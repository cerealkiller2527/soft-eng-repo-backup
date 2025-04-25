import { z } from 'zod';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.SecurityCreateWithoutServiceRequestInput> = z
    .object({
        location: z.string(),
    })
    .strict();

export const SecurityCreateWithoutServiceRequestInputObjectSchema = Schema;
