import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { ServiceRequestOrderByWithRelationInputObjectSchema } from './ServiceRequestOrderByWithRelationInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.EquipmentDeliveryOrderByWithRelationInput> = z
    .object({
        id: z.lazy(() => SortOrderSchema).optional(),
        deadline: z.lazy(() => SortOrderSchema).optional(),
        equipments: z.lazy(() => SortOrderSchema).optional(),
        toWhere: z.lazy(() => SortOrderSchema).optional(),
        serviceRequest: z.lazy(() => ServiceRequestOrderByWithRelationInputObjectSchema).optional(),
    })
    .strict();

export const EquipmentDeliveryOrderByWithRelationInputObjectSchema = Schema;
