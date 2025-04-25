import { z } from 'zod';
import { EquipmentDeliveryCreateInputObjectSchema } from './objects/EquipmentDeliveryCreateInput.schema';
import { EquipmentDeliveryUncheckedCreateInputObjectSchema } from './objects/EquipmentDeliveryUncheckedCreateInput.schema';

export const EquipmentDeliveryCreateOneSchema = z.object({
    data: z.union([
        EquipmentDeliveryCreateInputObjectSchema,
        EquipmentDeliveryUncheckedCreateInputObjectSchema,
    ]),
});
