import { z } from 'zod';
import { ServiceRequestWhereUniqueInputObjectSchema } from './ServiceRequestWhereUniqueInput.schema';
import { ServiceRequestCreateWithoutEquipmentDeliveryInputObjectSchema } from './ServiceRequestCreateWithoutEquipmentDeliveryInput.schema';
import { ServiceRequestUncheckedCreateWithoutEquipmentDeliveryInputObjectSchema } from './ServiceRequestUncheckedCreateWithoutEquipmentDeliveryInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.ServiceRequestCreateOrConnectWithoutEquipmentDeliveryInput> = z
    .object({
        where: z.lazy(() => ServiceRequestWhereUniqueInputObjectSchema),
        create: z.union([
            z.lazy(() => ServiceRequestCreateWithoutEquipmentDeliveryInputObjectSchema),
            z.lazy(() => ServiceRequestUncheckedCreateWithoutEquipmentDeliveryInputObjectSchema),
        ]),
    })
    .strict();

export const ServiceRequestCreateOrConnectWithoutEquipmentDeliveryInputObjectSchema = Schema;
