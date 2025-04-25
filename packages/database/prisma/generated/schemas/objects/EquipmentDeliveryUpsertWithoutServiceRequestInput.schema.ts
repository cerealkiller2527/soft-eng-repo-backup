import { z } from 'zod';
import { EquipmentDeliveryUpdateWithoutServiceRequestInputObjectSchema } from './EquipmentDeliveryUpdateWithoutServiceRequestInput.schema';
import { EquipmentDeliveryUncheckedUpdateWithoutServiceRequestInputObjectSchema } from './EquipmentDeliveryUncheckedUpdateWithoutServiceRequestInput.schema';
import { EquipmentDeliveryCreateWithoutServiceRequestInputObjectSchema } from './EquipmentDeliveryCreateWithoutServiceRequestInput.schema';
import { EquipmentDeliveryUncheckedCreateWithoutServiceRequestInputObjectSchema } from './EquipmentDeliveryUncheckedCreateWithoutServiceRequestInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.EquipmentDeliveryUpsertWithoutServiceRequestInput> = z
    .object({
        update: z.union([
            z.lazy(() => EquipmentDeliveryUpdateWithoutServiceRequestInputObjectSchema),
            z.lazy(() => EquipmentDeliveryUncheckedUpdateWithoutServiceRequestInputObjectSchema),
        ]),
        create: z.union([
            z.lazy(() => EquipmentDeliveryCreateWithoutServiceRequestInputObjectSchema),
            z.lazy(() => EquipmentDeliveryUncheckedCreateWithoutServiceRequestInputObjectSchema),
        ]),
    })
    .strict();

export const EquipmentDeliveryUpsertWithoutServiceRequestInputObjectSchema = Schema;
