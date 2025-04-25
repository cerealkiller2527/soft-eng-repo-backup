import { z } from 'zod';
import { ServiceRequestCreateWithoutEquipmentDeliveryInputObjectSchema } from './ServiceRequestCreateWithoutEquipmentDeliveryInput.schema';
import { ServiceRequestUncheckedCreateWithoutEquipmentDeliveryInputObjectSchema } from './ServiceRequestUncheckedCreateWithoutEquipmentDeliveryInput.schema';
import { ServiceRequestCreateOrConnectWithoutEquipmentDeliveryInputObjectSchema } from './ServiceRequestCreateOrConnectWithoutEquipmentDeliveryInput.schema';
import { ServiceRequestUpsertWithoutEquipmentDeliveryInputObjectSchema } from './ServiceRequestUpsertWithoutEquipmentDeliveryInput.schema';
import { ServiceRequestWhereUniqueInputObjectSchema } from './ServiceRequestWhereUniqueInput.schema';
import { ServiceRequestUpdateWithoutEquipmentDeliveryInputObjectSchema } from './ServiceRequestUpdateWithoutEquipmentDeliveryInput.schema';
import { ServiceRequestUncheckedUpdateWithoutEquipmentDeliveryInputObjectSchema } from './ServiceRequestUncheckedUpdateWithoutEquipmentDeliveryInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.ServiceRequestUpdateOneRequiredWithoutEquipmentDeliveryNestedInput> =
    z
        .object({
            create: z
                .union([
                    z.lazy(() => ServiceRequestCreateWithoutEquipmentDeliveryInputObjectSchema),
                    z.lazy(
                        () => ServiceRequestUncheckedCreateWithoutEquipmentDeliveryInputObjectSchema
                    ),
                ])
                .optional(),
            connectOrCreate: z
                .lazy(() => ServiceRequestCreateOrConnectWithoutEquipmentDeliveryInputObjectSchema)
                .optional(),
            upsert: z
                .lazy(() => ServiceRequestUpsertWithoutEquipmentDeliveryInputObjectSchema)
                .optional(),
            connect: z.lazy(() => ServiceRequestWhereUniqueInputObjectSchema).optional(),
            update: z
                .union([
                    z.lazy(() => ServiceRequestUpdateWithoutEquipmentDeliveryInputObjectSchema),
                    z.lazy(
                        () => ServiceRequestUncheckedUpdateWithoutEquipmentDeliveryInputObjectSchema
                    ),
                ])
                .optional(),
        })
        .strict();

export const ServiceRequestUpdateOneRequiredWithoutEquipmentDeliveryNestedInputObjectSchema =
    Schema;
