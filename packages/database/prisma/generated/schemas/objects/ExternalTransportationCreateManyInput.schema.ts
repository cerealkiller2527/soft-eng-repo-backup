import { z } from 'zod';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.ExternalTransportationCreateManyInput> = z
    .object({
        id: z.number(),
        fromWhere: z.string(),
        toWhere: z.string(),
        transportType: z.string(),
        patientName: z.string(),
        pickupTime: z.coerce.date(),
    })
    .strict();

export const ExternalTransportationCreateManyInputObjectSchema = Schema;
