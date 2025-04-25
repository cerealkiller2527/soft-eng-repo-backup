import { z } from 'zod';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.DepartmentCreateManyInput> = z
    .object({
        id: z.number().optional(),
        name: z.string(),
        description: z.string().optional().nullable(),
        phoneNumber: z.string(),
    })
    .strict();

export const DepartmentCreateManyInputObjectSchema = Schema;
