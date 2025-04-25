import { z } from 'zod';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.BuildingCreateManyInput> = z
    .object({
        id: z.number(),
        name: z.string(),
        address: z.string(),
        phoneNumber: z.string(),
    })
    .strict();

export const BuildingCreateManyInputObjectSchema = Schema;
