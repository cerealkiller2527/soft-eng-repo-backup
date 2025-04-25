import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.EquipmentDeliveryCountOrderByAggregateInput> = z
    .object({
        id: z.lazy(() => SortOrderSchema).optional(),
        deadline: z.lazy(() => SortOrderSchema).optional(),
        equipments: z.lazy(() => SortOrderSchema).optional(),
        toWhere: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const EquipmentDeliveryCountOrderByAggregateInputObjectSchema = Schema;
