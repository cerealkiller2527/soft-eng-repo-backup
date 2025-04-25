import { z } from 'zod';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.EquipmentDeliveryMaxAggregateInputType> = z
    .object({
        id: z.literal(true).optional(),
        deadline: z.literal(true).optional(),
        toWhere: z.literal(true).optional(),
    })
    .strict();

export const EquipmentDeliveryMaxAggregateInputObjectSchema = Schema;
