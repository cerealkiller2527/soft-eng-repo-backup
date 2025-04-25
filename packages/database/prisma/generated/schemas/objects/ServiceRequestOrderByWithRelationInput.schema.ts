import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { EmployeeOrderByWithRelationInputObjectSchema } from './EmployeeOrderByWithRelationInput.schema';
import { AudioVisualOrderByWithRelationInputObjectSchema } from './AudioVisualOrderByWithRelationInput.schema';
import { ExternalTransportationOrderByWithRelationInputObjectSchema } from './ExternalTransportationOrderByWithRelationInput.schema';
import { EquipmentDeliveryOrderByWithRelationInputObjectSchema } from './EquipmentDeliveryOrderByWithRelationInput.schema';
import { LanguageOrderByWithRelationInputObjectSchema } from './LanguageOrderByWithRelationInput.schema';
import { SecurityOrderByWithRelationInputObjectSchema } from './SecurityOrderByWithRelationInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.ServiceRequestOrderByWithRelationInput> = z
    .object({
        id: z.lazy(() => SortOrderSchema).optional(),
        type: z.lazy(() => SortOrderSchema).optional(),
        dateCreated: z.lazy(() => SortOrderSchema).optional(),
        dateUpdated: z
            .union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputObjectSchema)])
            .optional(),
        status: z.lazy(() => SortOrderSchema).optional(),
        description: z.lazy(() => SortOrderSchema).optional(),
        assignedEmployeeID: z
            .union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputObjectSchema)])
            .optional(),
        fromEmployee: z.lazy(() => SortOrderSchema).optional(),
        priority: z.lazy(() => SortOrderSchema).optional(),
        assignedTo: z.lazy(() => EmployeeOrderByWithRelationInputObjectSchema).optional(),
        audioVisual: z.lazy(() => AudioVisualOrderByWithRelationInputObjectSchema).optional(),
        externalTransportation: z
            .lazy(() => ExternalTransportationOrderByWithRelationInputObjectSchema)
            .optional(),
        equipmentDelivery: z
            .lazy(() => EquipmentDeliveryOrderByWithRelationInputObjectSchema)
            .optional(),
        language: z.lazy(() => LanguageOrderByWithRelationInputObjectSchema).optional(),
        security: z.lazy(() => SecurityOrderByWithRelationInputObjectSchema).optional(),
    })
    .strict();

export const ServiceRequestOrderByWithRelationInputObjectSchema = Schema;
