import { z } from 'zod';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.EdgeUncheckedCreateInput> = z
    .object({
        id: z.number().optional(),
        fromNodeId: z.number(),
        toNodeId: z.number(),
    })
    .strict();

export const EdgeUncheckedCreateInputObjectSchema = Schema;
