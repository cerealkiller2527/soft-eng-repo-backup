import { z } from 'zod';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.UserCreateInput> = z
    .object({
        username: z.string(),
        password: z.string(),
        email: z.string(),
    })
    .strict();

export const UserCreateInputObjectSchema = Schema;
