import { z } from 'zod';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.LocationUncheckedCreateWithoutDepartmentInput> = z
    .object({
        id: z.number().optional(),
        floor: z.number(),
        suite: z.string().optional().nullable(),
        buildingId: z.number(),
        nodeID: z.number().optional().nullable(),
    })
    .strict();

export const LocationUncheckedCreateWithoutDepartmentInputObjectSchema = Schema;
