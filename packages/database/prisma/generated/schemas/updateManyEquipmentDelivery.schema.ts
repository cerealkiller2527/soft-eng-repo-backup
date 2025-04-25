import { z } from 'zod';
import { EquipmentDeliveryUpdateManyMutationInputObjectSchema } from './objects/EquipmentDeliveryUpdateManyMutationInput.schema';
import { EquipmentDeliveryWhereInputObjectSchema } from './objects/EquipmentDeliveryWhereInput.schema';

export const EquipmentDeliveryUpdateManySchema = z.object({
    data: EquipmentDeliveryUpdateManyMutationInputObjectSchema,
    where: EquipmentDeliveryWhereInputObjectSchema.optional(),
});
