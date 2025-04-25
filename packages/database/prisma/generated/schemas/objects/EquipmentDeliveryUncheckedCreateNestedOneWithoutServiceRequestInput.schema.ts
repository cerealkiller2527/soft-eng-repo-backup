import { z } from 'zod';
import { EquipmentDeliveryCreateWithoutServiceRequestInputObjectSchema } from './EquipmentDeliveryCreateWithoutServiceRequestInput.schema';
import { EquipmentDeliveryUncheckedCreateWithoutServiceRequestInputObjectSchema } from './EquipmentDeliveryUncheckedCreateWithoutServiceRequestInput.schema';
import { EquipmentDeliveryCreateOrConnectWithoutServiceRequestInputObjectSchema } from './EquipmentDeliveryCreateOrConnectWithoutServiceRequestInput.schema';
import { EquipmentDeliveryWhereUniqueInputObjectSchema } from './EquipmentDeliveryWhereUniqueInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.EquipmentDeliveryUncheckedCreateNestedOneWithoutServiceRequestInput> =
    z
        .object({
            create: z
                .union([
                    z.lazy(() => EquipmentDeliveryCreateWithoutServiceRequestInputObjectSchema),
                    z.lazy(
                        () => EquipmentDeliveryUncheckedCreateWithoutServiceRequestInputObjectSchema
                    ),
                ])
                .optional(),
            connectOrCreate: z
                .lazy(() => EquipmentDeliveryCreateOrConnectWithoutServiceRequestInputObjectSchema)
                .optional(),
            connect: z.lazy(() => EquipmentDeliveryWhereUniqueInputObjectSchema).optional(),
        })
        .strict();

export const EquipmentDeliveryUncheckedCreateNestedOneWithoutServiceRequestInputObjectSchema =
    Schema;
