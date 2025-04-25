import { z } from 'zod';
import { IntWithAggregatesFilterObjectSchema } from './IntWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema';
import { StringNullableListFilterObjectSchema } from './StringNullableListFilter.schema';
import { StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.EquipmentDeliveryScalarWhereWithAggregatesInput> = z
    .object({
        AND: z
            .union([
                z.lazy(() => EquipmentDeliveryScalarWhereWithAggregatesInputObjectSchema),
                z.lazy(() => EquipmentDeliveryScalarWhereWithAggregatesInputObjectSchema).array(),
            ])
            .optional(),
        OR: z
            .lazy(() => EquipmentDeliveryScalarWhereWithAggregatesInputObjectSchema)
            .array()
            .optional(),
        NOT: z
            .union([
                z.lazy(() => EquipmentDeliveryScalarWhereWithAggregatesInputObjectSchema),
                z.lazy(() => EquipmentDeliveryScalarWhereWithAggregatesInputObjectSchema).array(),
            ])
            .optional(),
        id: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number()]).optional(),
        deadline: z
            .union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()])
            .optional(),
        equipments: z.lazy(() => StringNullableListFilterObjectSchema).optional(),
        toWhere: z
            .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
            .optional(),
    })
    .strict();

export const EquipmentDeliveryScalarWhereWithAggregatesInputObjectSchema = Schema;
