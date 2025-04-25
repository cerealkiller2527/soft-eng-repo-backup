import { z } from 'zod';
import { EquipmentDeliveryWhereInputObjectSchema } from './objects/EquipmentDeliveryWhereInput.schema';

export const EquipmentDeliveryDeleteManySchema = z.object({
    where: EquipmentDeliveryWhereInputObjectSchema.optional(),
});
