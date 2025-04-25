import { z } from 'zod';
import { IntFilterObjectSchema } from './IntFilter.schema';
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { StringNullableListFilterObjectSchema } from './StringNullableListFilter.schema';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { ServiceRequestRelationFilterObjectSchema } from './ServiceRequestRelationFilter.schema';
import { ServiceRequestWhereInputObjectSchema } from './ServiceRequestWhereInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.EquipmentDeliveryWhereInput> = z
    .object({
        AND: z
            .union([
                z.lazy(() => EquipmentDeliveryWhereInputObjectSchema),
                z.lazy(() => EquipmentDeliveryWhereInputObjectSchema).array(),
            ])
            .optional(),
        OR: z
            .lazy(() => EquipmentDeliveryWhereInputObjectSchema)
            .array()
            .optional(),
        NOT: z
            .union([
                z.lazy(() => EquipmentDeliveryWhereInputObjectSchema),
                z.lazy(() => EquipmentDeliveryWhereInputObjectSchema).array(),
            ])
            .optional(),
        id: z.union([z.lazy(() => IntFilterObjectSchema), z.number()]).optional(),
        deadline: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
        equipments: z.lazy(() => StringNullableListFilterObjectSchema).optional(),
        toWhere: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
        serviceRequest: z
            .union([
                z.lazy(() => ServiceRequestRelationFilterObjectSchema),
                z.lazy(() => ServiceRequestWhereInputObjectSchema),
            ])
            .optional(),
    })
    .strict();

export const EquipmentDeliveryWhereInputObjectSchema = Schema;
