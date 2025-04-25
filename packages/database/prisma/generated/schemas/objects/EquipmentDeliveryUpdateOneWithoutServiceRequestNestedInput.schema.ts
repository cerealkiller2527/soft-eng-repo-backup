import { z } from 'zod';
import { EquipmentDeliveryCreateWithoutServiceRequestInputObjectSchema } from './EquipmentDeliveryCreateWithoutServiceRequestInput.schema';
import { EquipmentDeliveryUncheckedCreateWithoutServiceRequestInputObjectSchema } from './EquipmentDeliveryUncheckedCreateWithoutServiceRequestInput.schema';
import { EquipmentDeliveryCreateOrConnectWithoutServiceRequestInputObjectSchema } from './EquipmentDeliveryCreateOrConnectWithoutServiceRequestInput.schema';
import { EquipmentDeliveryUpsertWithoutServiceRequestInputObjectSchema } from './EquipmentDeliveryUpsertWithoutServiceRequestInput.schema';
import { EquipmentDeliveryWhereUniqueInputObjectSchema } from './EquipmentDeliveryWhereUniqueInput.schema';
import { EquipmentDeliveryUpdateWithoutServiceRequestInputObjectSchema } from './EquipmentDeliveryUpdateWithoutServiceRequestInput.schema';
import { EquipmentDeliveryUncheckedUpdateWithoutServiceRequestInputObjectSchema } from './EquipmentDeliveryUncheckedUpdateWithoutServiceRequestInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.EquipmentDeliveryUpdateOneWithoutServiceRequestNestedInput> = z
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
        upsert: z
            .lazy(() => EquipmentDeliveryUpsertWithoutServiceRequestInputObjectSchema)
            .optional(),
        disconnect: z.boolean().optional(),
        delete: z.boolean().optional(),
        connect: z.lazy(() => EquipmentDeliveryWhereUniqueInputObjectSchema).optional(),
        update: z
            .union([
                z.lazy(() => EquipmentDeliveryUpdateWithoutServiceRequestInputObjectSchema),
                z.lazy(
                    () => EquipmentDeliveryUncheckedUpdateWithoutServiceRequestInputObjectSchema
                ),
            ])
            .optional(),
    })
    .strict();

export const EquipmentDeliveryUpdateOneWithoutServiceRequestNestedInputObjectSchema = Schema;
