import { z } from 'zod';
import { EquipmentDeliveryUpdateInputObjectSchema } from './objects/EquipmentDeliveryUpdateInput.schema';
import { EquipmentDeliveryUncheckedUpdateInputObjectSchema } from './objects/EquipmentDeliveryUncheckedUpdateInput.schema';
import { EquipmentDeliveryWhereUniqueInputObjectSchema } from './objects/EquipmentDeliveryWhereUniqueInput.schema';

export const EquipmentDeliveryUpdateOneSchema = z.object({
    data: z.union([
        EquipmentDeliveryUpdateInputObjectSchema,
        EquipmentDeliveryUncheckedUpdateInputObjectSchema,
    ]),
    where: EquipmentDeliveryWhereUniqueInputObjectSchema,
});
