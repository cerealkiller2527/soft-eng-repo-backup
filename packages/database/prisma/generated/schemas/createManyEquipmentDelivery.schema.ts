import { z } from 'zod';
import { EquipmentDeliveryCreateManyInputObjectSchema } from './objects/EquipmentDeliveryCreateManyInput.schema';

export const EquipmentDeliveryCreateManySchema = z.object({
    data: z.union([
        EquipmentDeliveryCreateManyInputObjectSchema,
        z.array(EquipmentDeliveryCreateManyInputObjectSchema),
    ]),
    skipDuplicates: z.boolean().optional(),
});
