import { z } from 'zod';
import { EquipmentDeliveryWhereInputObjectSchema } from './objects/EquipmentDeliveryWhereInput.schema';
import { EquipmentDeliveryOrderByWithAggregationInputObjectSchema } from './objects/EquipmentDeliveryOrderByWithAggregationInput.schema';
import { EquipmentDeliveryScalarWhereWithAggregatesInputObjectSchema } from './objects/EquipmentDeliveryScalarWhereWithAggregatesInput.schema';
import { EquipmentDeliveryScalarFieldEnumSchema } from './enums/EquipmentDeliveryScalarFieldEnum.schema';

export const EquipmentDeliveryGroupBySchema = z.object({
    where: EquipmentDeliveryWhereInputObjectSchema.optional(),
    orderBy: z
        .union([
            EquipmentDeliveryOrderByWithAggregationInputObjectSchema,
            EquipmentDeliveryOrderByWithAggregationInputObjectSchema.array(),
        ])
        .optional(),
    having: EquipmentDeliveryScalarWhereWithAggregatesInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    by: z.array(EquipmentDeliveryScalarFieldEnumSchema),
});
