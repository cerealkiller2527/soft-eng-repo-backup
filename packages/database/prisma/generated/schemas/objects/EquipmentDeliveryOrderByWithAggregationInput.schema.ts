import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { EquipmentDeliveryCountOrderByAggregateInputObjectSchema } from './EquipmentDeliveryCountOrderByAggregateInput.schema';
import { EquipmentDeliveryAvgOrderByAggregateInputObjectSchema } from './EquipmentDeliveryAvgOrderByAggregateInput.schema';
import { EquipmentDeliveryMaxOrderByAggregateInputObjectSchema } from './EquipmentDeliveryMaxOrderByAggregateInput.schema';
import { EquipmentDeliveryMinOrderByAggregateInputObjectSchema } from './EquipmentDeliveryMinOrderByAggregateInput.schema';
import { EquipmentDeliverySumOrderByAggregateInputObjectSchema } from './EquipmentDeliverySumOrderByAggregateInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.EquipmentDeliveryOrderByWithAggregationInput> = z
    .object({
        id: z.lazy(() => SortOrderSchema).optional(),
        deadline: z.lazy(() => SortOrderSchema).optional(),
        equipments: z.lazy(() => SortOrderSchema).optional(),
        toWhere: z.lazy(() => SortOrderSchema).optional(),
        _count: z.lazy(() => EquipmentDeliveryCountOrderByAggregateInputObjectSchema).optional(),
        _avg: z.lazy(() => EquipmentDeliveryAvgOrderByAggregateInputObjectSchema).optional(),
        _max: z.lazy(() => EquipmentDeliveryMaxOrderByAggregateInputObjectSchema).optional(),
        _min: z.lazy(() => EquipmentDeliveryMinOrderByAggregateInputObjectSchema).optional(),
        _sum: z.lazy(() => EquipmentDeliverySumOrderByAggregateInputObjectSchema).optional(),
    })
    .strict();

export const EquipmentDeliveryOrderByWithAggregationInputObjectSchema = Schema;
