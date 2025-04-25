import { z } from 'zod';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.ExternalTransportationMaxAggregateInputType> = z
    .object({
        id: z.literal(true).optional(),
        fromWhere: z.literal(true).optional(),
        toWhere: z.literal(true).optional(),
        transportType: z.literal(true).optional(),
        patientName: z.literal(true).optional(),
        pickupTime: z.literal(true).optional(),
    })
    .strict();

export const ExternalTransportationMaxAggregateInputObjectSchema = Schema;
