import { z } from 'zod';
import { EquipmentDeliveryWhereUniqueInputObjectSchema } from './objects/EquipmentDeliveryWhereUniqueInput.schema';
import { EquipmentDeliveryCreateInputObjectSchema } from './objects/EquipmentDeliveryCreateInput.schema';
import { EquipmentDeliveryUncheckedCreateInputObjectSchema } from './objects/EquipmentDeliveryUncheckedCreateInput.schema';
import { EquipmentDeliveryUpdateInputObjectSchema } from './objects/EquipmentDeliveryUpdateInput.schema';
import { EquipmentDeliveryUncheckedUpdateInputObjectSchema } from './objects/EquipmentDeliveryUncheckedUpdateInput.schema';

export const EquipmentDeliveryUpsertSchema = z.object({
    where: EquipmentDeliveryWhereUniqueInputObjectSchema,
    create: z.union([
        EquipmentDeliveryCreateInputObjectSchema,
        EquipmentDeliveryUncheckedCreateInputObjectSchema,
    ]),
    update: z.union([
        EquipmentDeliveryUpdateInputObjectSchema,
        EquipmentDeliveryUncheckedUpdateInputObjectSchema,
    ]),
});
