import { z } from 'zod';
import { EquipmentDeliveryWhereInputObjectSchema } from './EquipmentDeliveryWhereInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.EquipmentDeliveryRelationFilter> = z
    .object({
        is: z
            .lazy(() => EquipmentDeliveryWhereInputObjectSchema)
            .optional()
            .nullable(),
        isNot: z
            .lazy(() => EquipmentDeliveryWhereInputObjectSchema)
            .optional()
            .nullable(),
    })
    .strict();

export const EquipmentDeliveryRelationFilterObjectSchema = Schema;
