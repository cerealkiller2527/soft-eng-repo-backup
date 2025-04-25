import { z } from 'zod';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.EdgeCreateManyFromNodeInput> = z
    .object({
        id: z.number().optional(),
        toNodeId: z.number(),
    })
    .strict();

export const EdgeCreateManyFromNodeInputObjectSchema = Schema;
