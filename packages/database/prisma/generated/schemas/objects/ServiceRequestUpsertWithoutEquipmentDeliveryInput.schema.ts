import { z } from 'zod';
import { ServiceRequestUpdateWithoutEquipmentDeliveryInputObjectSchema } from './ServiceRequestUpdateWithoutEquipmentDeliveryInput.schema';
import { ServiceRequestUncheckedUpdateWithoutEquipmentDeliveryInputObjectSchema } from './ServiceRequestUncheckedUpdateWithoutEquipmentDeliveryInput.schema';
import { ServiceRequestCreateWithoutEquipmentDeliveryInputObjectSchema } from './ServiceRequestCreateWithoutEquipmentDeliveryInput.schema';
import { ServiceRequestUncheckedCreateWithoutEquipmentDeliveryInputObjectSchema } from './ServiceRequestUncheckedCreateWithoutEquipmentDeliveryInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.ServiceRequestUpsertWithoutEquipmentDeliveryInput> = z
    .object({
        update: z.union([
            z.lazy(() => ServiceRequestUpdateWithoutEquipmentDeliveryInputObjectSchema),
            z.lazy(() => ServiceRequestUncheckedUpdateWithoutEquipmentDeliveryInputObjectSchema),
        ]),
        create: z.union([
            z.lazy(() => ServiceRequestCreateWithoutEquipmentDeliveryInputObjectSchema),
            z.lazy(() => ServiceRequestUncheckedCreateWithoutEquipmentDeliveryInputObjectSchema),
        ]),
    })
    .strict();

export const ServiceRequestUpsertWithoutEquipmentDeliveryInputObjectSchema = Schema;
