import { z } from 'zod';
import { nodeTypeSchema } from '../enums/nodeType.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.NodeCreateManyInput> = z
    .object({
        id: z.number().optional(),
        type: z.lazy(() => nodeTypeSchema),
        description: z.string(),
        lat: z.number(),
        long: z.number(),
    })
    .strict();

export const NodeCreateManyInputObjectSchema = Schema;
