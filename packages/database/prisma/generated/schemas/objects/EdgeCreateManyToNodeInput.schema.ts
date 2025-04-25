import { z } from 'zod';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.EdgeCreateManyToNodeInput> = z
    .object({
        id: z.number().optional(),
        fromNodeId: z.number(),
    })
    .strict();

export const EdgeCreateManyToNodeInputObjectSchema = Schema;
