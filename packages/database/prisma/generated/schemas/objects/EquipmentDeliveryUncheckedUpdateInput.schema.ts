import { z } from 'zod';
import { IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { EquipmentDeliveryUpdateequipmentsInputObjectSchema } from './EquipmentDeliveryUpdateequipmentsInput.schema';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.EquipmentDeliveryUncheckedUpdateInput> = z
    .object({
        id: z
            .union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)])
            .optional(),
        deadline: z
            .union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)])
            .optional(),
        equipments: z
            .union([
                z.lazy(() => EquipmentDeliveryUpdateequipmentsInputObjectSchema),
                z.string().array(),
            ])
            .optional(),
        toWhere: z
            .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
            .optional(),
    })
    .strict();

export const EquipmentDeliveryUncheckedUpdateInputObjectSchema = Schema;
