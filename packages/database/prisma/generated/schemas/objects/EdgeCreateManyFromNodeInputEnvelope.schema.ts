import { z } from 'zod';
import { EdgeCreateManyFromNodeInputObjectSchema } from './EdgeCreateManyFromNodeInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.EdgeCreateManyFromNodeInputEnvelope> = z
    .object({
        data: z.union([
            z.lazy(() => EdgeCreateManyFromNodeInputObjectSchema),
            z.lazy(() => EdgeCreateManyFromNodeInputObjectSchema).array(),
        ]),
        skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const EdgeCreateManyFromNodeInputEnvelopeObjectSchema = Schema;
