import { z } from 'zod';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.EquipmentDeliveryCountAggregateInputType> = z
    .object({
        id: z.literal(true).optional(),
        deadline: z.literal(true).optional(),
        equipments: z.literal(true).optional(),
        toWhere: z.literal(true).optional(),
        _all: z.literal(true).optional(),
    })
    .strict();

export const EquipmentDeliveryCountAggregateInputObjectSchema = Schema;
