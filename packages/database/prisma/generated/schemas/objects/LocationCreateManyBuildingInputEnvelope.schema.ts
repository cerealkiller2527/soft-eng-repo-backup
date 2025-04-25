import { z } from 'zod';
import { LocationCreateManyBuildingInputObjectSchema } from './LocationCreateManyBuildingInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.LocationCreateManyBuildingInputEnvelope> = z
    .object({
        data: z.union([
            z.lazy(() => LocationCreateManyBuildingInputObjectSchema),
            z.lazy(() => LocationCreateManyBuildingInputObjectSchema).array(),
        ]),
        skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const LocationCreateManyBuildingInputEnvelopeObjectSchema = Schema;
