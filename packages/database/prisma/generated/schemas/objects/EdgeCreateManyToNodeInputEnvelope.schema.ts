import { z } from 'zod';
import { EdgeCreateManyToNodeInputObjectSchema } from './EdgeCreateManyToNodeInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.EdgeCreateManyToNodeInputEnvelope> = z
    .object({
        data: z.union([
            z.lazy(() => EdgeCreateManyToNodeInputObjectSchema),
            z.lazy(() => EdgeCreateManyToNodeInputObjectSchema).array(),
        ]),
        skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const EdgeCreateManyToNodeInputEnvelopeObjectSchema = Schema;
