import { z } from 'zod';
import { RequestTypeSchema } from '../enums/RequestType.schema';
import { StatusSchema } from '../enums/Status.schema';
import { PrioritySchema } from '../enums/Priority.schema';
import { AudioVisualCreateNestedOneWithoutServiceRequestInputObjectSchema } from './AudioVisualCreateNestedOneWithoutServiceRequestInput.schema';
import { ExternalTransportationCreateNestedOneWithoutServiceRequestInputObjectSchema } from './ExternalTransportationCreateNestedOneWithoutServiceRequestInput.schema';
import { EquipmentDeliveryCreateNestedOneWithoutServiceRequestInputObjectSchema } from './EquipmentDeliveryCreateNestedOneWithoutServiceRequestInput.schema';
import { LanguageCreateNestedOneWithoutServiceRequestInputObjectSchema } from './LanguageCreateNestedOneWithoutServiceRequestInput.schema';
import { SecurityCreateNestedOneWithoutServiceRequestInputObjectSchema } from './SecurityCreateNestedOneWithoutServiceRequestInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.ServiceRequestCreateWithoutAssignedToInput> = z
    .object({
        type: z.lazy(() => RequestTypeSchema),
        dateCreated: z.coerce.date().optional(),
        dateUpdated: z.coerce.date().optional().nullable(),
        status: z.lazy(() => StatusSchema),
        description: z.string(),
        fromEmployee: z.string(),
        priority: z.lazy(() => PrioritySchema),
        audioVisual: z
            .lazy(() => AudioVisualCreateNestedOneWithoutServiceRequestInputObjectSchema)
            .optional(),
        externalTransportation: z
            .lazy(() => ExternalTransportationCreateNestedOneWithoutServiceRequestInputObjectSchema)
            .optional(),
        equipmentDelivery: z
            .lazy(() => EquipmentDeliveryCreateNestedOneWithoutServiceRequestInputObjectSchema)
            .optional(),
        language: z
            .lazy(() => LanguageCreateNestedOneWithoutServiceRequestInputObjectSchema)
            .optional(),
        security: z
            .lazy(() => SecurityCreateNestedOneWithoutServiceRequestInputObjectSchema)
            .optional(),
    })
    .strict();

export const ServiceRequestCreateWithoutAssignedToInputObjectSchema = Schema;
