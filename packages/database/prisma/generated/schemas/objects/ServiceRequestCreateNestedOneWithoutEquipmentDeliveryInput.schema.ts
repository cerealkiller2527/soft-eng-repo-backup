import { z } from 'zod';
import { ServiceRequestCreateWithoutEquipmentDeliveryInputObjectSchema } from './ServiceRequestCreateWithoutEquipmentDeliveryInput.schema';
import { ServiceRequestUncheckedCreateWithoutEquipmentDeliveryInputObjectSchema } from './ServiceRequestUncheckedCreateWithoutEquipmentDeliveryInput.schema';
import { ServiceRequestCreateOrConnectWithoutEquipmentDeliveryInputObjectSchema } from './ServiceRequestCreateOrConnectWithoutEquipmentDeliveryInput.schema';
import { ServiceRequestWhereUniqueInputObjectSchema } from './ServiceRequestWhereUniqueInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.ServiceRequestCreateNestedOneWithoutEquipmentDeliveryInput> = z
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
        connect: z.lazy(() => ServiceRequestWhereUniqueInputObjectSchema).optional(),
    })
    .strict();

export const ServiceRequestCreateNestedOneWithoutEquipmentDeliveryInputObjectSchema = Schema;
