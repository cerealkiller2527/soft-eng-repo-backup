import { z } from 'zod';
import { EquipmentDeliveryCreateequipmentsInputObjectSchema } from './EquipmentDeliveryCreateequipmentsInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.EquipmentDeliveryUncheckedCreateInput> = z
    .object({
        id: z.number(),
        deadline: z.coerce.date(),
        equipments: z
            .union([
                z.lazy(() => EquipmentDeliveryCreateequipmentsInputObjectSchema),
                z.string().array(),
            ])
            .optional(),
        toWhere: z.string(),
    })
    .strict();

export const EquipmentDeliveryUncheckedCreateInputObjectSchema = Schema;
