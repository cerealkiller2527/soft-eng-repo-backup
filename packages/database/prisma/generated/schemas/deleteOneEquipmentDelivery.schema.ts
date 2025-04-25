import { z } from 'zod';
import { EquipmentDeliveryWhereUniqueInputObjectSchema } from './objects/EquipmentDeliveryWhereUniqueInput.schema';

export const EquipmentDeliveryDeleteOneSchema = z.object({
    where: EquipmentDeliveryWhereUniqueInputObjectSchema,
});
