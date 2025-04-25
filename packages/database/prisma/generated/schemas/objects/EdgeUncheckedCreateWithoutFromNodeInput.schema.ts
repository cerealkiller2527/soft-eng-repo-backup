import { z } from 'zod';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.EdgeUncheckedCreateWithoutFromNodeInput> = z
    .object({
        id: z.number().optional(),
        toNodeId: z.number(),
    })
    .strict();

export const EdgeUncheckedCreateWithoutFromNodeInputObjectSchema = Schema;
