import { z } from 'zod';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.LocationCreateManyNodeInput> = z
    .object({
        id: z.number().optional(),
        floor: z.number(),
        suite: z.string().optional().nullable(),
        buildingId: z.number(),
        departmentId: z.number().optional().nullable(),
    })
    .strict();

export const LocationCreateManyNodeInputObjectSchema = Schema;
