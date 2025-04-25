import { z } from 'zod';
import { EquipmentDeliveryCreateequipmentsInputObjectSchema } from './EquipmentDeliveryCreateequipmentsInput.schema';
import { ServiceRequestCreateNestedOneWithoutEquipmentDeliveryInputObjectSchema } from './ServiceRequestCreateNestedOneWithoutEquipmentDeliveryInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.EquipmentDeliveryCreateInput> = z
    .object({
        deadline: z.coerce.date(),
        equipments: z
            .union([
                z.lazy(() => EquipmentDeliveryCreateequipmentsInputObjectSchema),
                z.string().array(),
            ])
            .optional(),
        toWhere: z.string(),
        serviceRequest: z.lazy(
            () => ServiceRequestCreateNestedOneWithoutEquipmentDeliveryInputObjectSchema
        ),
    })
    .strict();

export const EquipmentDeliveryCreateInputObjectSchema = Schema;
