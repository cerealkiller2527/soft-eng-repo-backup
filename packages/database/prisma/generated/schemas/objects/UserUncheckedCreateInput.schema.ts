import { z } from 'zod';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.UserUncheckedCreateInput> = z
    .object({
        username: z.string(),
        password: z.string(),
        email: z.string(),
    })
    .strict();

export const UserUncheckedCreateInputObjectSchema = Schema;
