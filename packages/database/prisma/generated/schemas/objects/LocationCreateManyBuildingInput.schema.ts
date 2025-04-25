import { z } from 'zod';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.LocationCreateManyBuildingInput> = z
    .object({
        id: z.number().optional(),
        floor: z.number(),
        suite: z.string().optional().nullable(),
        departmentId: z.number().optional().nullable(),
        nodeID: z.number().optional().nullable(),
    })
    .strict();

export const LocationCreateManyBuildingInputObjectSchema = Schema;
