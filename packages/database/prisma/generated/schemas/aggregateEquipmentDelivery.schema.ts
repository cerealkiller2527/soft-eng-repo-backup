import { z } from 'zod';
import { EquipmentDeliveryOrderByWithRelationInputObjectSchema } from './objects/EquipmentDeliveryOrderByWithRelationInput.schema';
import { EquipmentDeliveryWhereInputObjectSchema } from './objects/EquipmentDeliveryWhereInput.schema';
import { EquipmentDeliveryWhereUniqueInputObjectSchema } from './objects/EquipmentDeliveryWhereUniqueInput.schema';
import { EquipmentDeliveryCountAggregateInputObjectSchema } from './objects/EquipmentDeliveryCountAggregateInput.schema';
import { EquipmentDeliveryMinAggregateInputObjectSchema } from './objects/EquipmentDeliveryMinAggregateInput.schema';
import { EquipmentDeliveryMaxAggregateInputObjectSchema } from './objects/EquipmentDeliveryMaxAggregateInput.schema';
import { EquipmentDeliveryAvgAggregateInputObjectSchema } from './objects/EquipmentDeliveryAvgAggregateInput.schema';
import { EquipmentDeliverySumAggregateInputObjectSchema } from './objects/EquipmentDeliverySumAggregateInput.schema';

export const EquipmentDeliveryAggregateSchema = z.object({
    orderBy: z
        .union([
            EquipmentDeliveryOrderByWithRelationInputObjectSchema,
            EquipmentDeliveryOrderByWithRelationInputObjectSchema.array(),
        ])
        .optional(),
    where: EquipmentDeliveryWhereInputObjectSchema.optional(),
    cursor: EquipmentDeliveryWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    _count: z.union([z.literal(true), EquipmentDeliveryCountAggregateInputObjectSchema]).optional(),
    _min: EquipmentDeliveryMinAggregateInputObjectSchema.optional(),
    _max: EquipmentDeliveryMaxAggregateInputObjectSchema.optional(),
    _avg: EquipmentDeliveryAvgAggregateInputObjectSchema.optional(),
    _sum: EquipmentDeliverySumAggregateInputObjectSchema.optional(),
});
