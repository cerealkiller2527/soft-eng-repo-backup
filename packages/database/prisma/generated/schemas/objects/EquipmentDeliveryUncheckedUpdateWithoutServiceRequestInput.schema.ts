import { z } from 'zod';
import { DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { EquipmentDeliveryUpdateequipmentsInputObjectSchema } from './EquipmentDeliveryUpdateequipmentsInput.schema';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.EquipmentDeliveryUncheckedUpdateWithoutServiceRequestInput> = z
    .object({
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

export const EquipmentDeliveryUncheckedUpdateWithoutServiceRequestInputObjectSchema = Schema;
