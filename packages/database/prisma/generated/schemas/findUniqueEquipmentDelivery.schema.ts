import { z } from 'zod';
import { EquipmentDeliveryWhereUniqueInputObjectSchema } from './objects/EquipmentDeliveryWhereUniqueInput.schema';

export const EquipmentDeliveryFindUniqueSchema = z.object({
    where: EquipmentDeliveryWhereUniqueInputObjectSchema,
});
