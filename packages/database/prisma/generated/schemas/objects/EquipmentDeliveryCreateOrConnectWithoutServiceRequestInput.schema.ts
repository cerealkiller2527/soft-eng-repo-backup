import { z } from 'zod';
import { EquipmentDeliveryWhereUniqueInputObjectSchema } from './EquipmentDeliveryWhereUniqueInput.schema';
import { EquipmentDeliveryCreateWithoutServiceRequestInputObjectSchema } from './EquipmentDeliveryCreateWithoutServiceRequestInput.schema';
import { EquipmentDeliveryUncheckedCreateWithoutServiceRequestInputObjectSchema } from './EquipmentDeliveryUncheckedCreateWithoutServiceRequestInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.EquipmentDeliveryCreateOrConnectWithoutServiceRequestInput> = z
    .object({
        where: z.lazy(() => EquipmentDeliveryWhereUniqueInputObjectSchema),
        create: z.union([
            z.lazy(() => EquipmentDeliveryCreateWithoutServiceRequestInputObjectSchema),
            z.lazy(() => EquipmentDeliveryUncheckedCreateWithoutServiceRequestInputObjectSchema),
        ]),
    })
    .strict();

export const EquipmentDeliveryCreateOrConnectWithoutServiceRequestInputObjectSchema = Schema;
