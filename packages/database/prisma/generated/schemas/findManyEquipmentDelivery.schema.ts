import { z } from 'zod';
import { EquipmentDeliveryOrderByWithRelationInputObjectSchema } from './objects/EquipmentDeliveryOrderByWithRelationInput.schema';
import { EquipmentDeliveryWhereInputObjectSchema } from './objects/EquipmentDeliveryWhereInput.schema';
import { EquipmentDeliveryWhereUniqueInputObjectSchema } from './objects/EquipmentDeliveryWhereUniqueInput.schema';
import { EquipmentDeliveryScalarFieldEnumSchema } from './enums/EquipmentDeliveryScalarFieldEnum.schema';

export const EquipmentDeliveryFindManySchema = z.object({
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
    distinct: z.array(EquipmentDeliveryScalarFieldEnumSchema).optional(),
});
