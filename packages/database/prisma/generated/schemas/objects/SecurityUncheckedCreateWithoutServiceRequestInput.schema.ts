import { z } from 'zod';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.SecurityUncheckedCreateWithoutServiceRequestInput> = z
    .object({
        location: z.string(),
    })
    .strict();

export const SecurityUncheckedCreateWithoutServiceRequestInputObjectSchema = Schema;
