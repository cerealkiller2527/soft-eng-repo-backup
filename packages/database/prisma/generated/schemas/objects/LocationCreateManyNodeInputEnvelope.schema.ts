import { z } from 'zod';
import { LocationCreateManyNodeInputObjectSchema } from './LocationCreateManyNodeInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.LocationCreateManyNodeInputEnvelope> = z
    .object({
        data: z.union([
            z.lazy(() => LocationCreateManyNodeInputObjectSchema),
            z.lazy(() => LocationCreateManyNodeInputObjectSchema).array(),
        ]),
        skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const LocationCreateManyNodeInputEnvelopeObjectSchema = Schema;
