import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.EquipmentDeliveryAvgOrderByAggregateInput> = z
    .object({
        id: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const EquipmentDeliveryAvgOrderByAggregateInputObjectSchema = Schema;
