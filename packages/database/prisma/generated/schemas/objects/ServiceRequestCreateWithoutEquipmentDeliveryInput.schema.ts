import { z } from 'zod';
import { RequestTypeSchema } from '../enums/RequestType.schema';
import { StatusSchema } from '../enums/Status.schema';
import { PrioritySchema } from '../enums/Priority.schema';
import { EmployeeCreateNestedOneWithoutServiceRequestInputObjectSchema } from './EmployeeCreateNestedOneWithoutServiceRequestInput.schema';
import { AudioVisualCreateNestedOneWithoutServiceRequestInputObjectSchema } from './AudioVisualCreateNestedOneWithoutServiceRequestInput.schema';
import { ExternalTransportationCreateNestedOneWithoutServiceRequestInputObjectSchema } from './ExternalTransportationCreateNestedOneWithoutServiceRequestInput.schema';
import { LanguageCreateNestedOneWithoutServiceRequestInputObjectSchema } from './LanguageCreateNestedOneWithoutServiceRequestInput.schema';
import { SecurityCreateNestedOneWithoutServiceRequestInputObjectSchema } from './SecurityCreateNestedOneWithoutServiceRequestInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.ServiceRequestCreateWithoutEquipmentDeliveryInput> = z
    .object({
        type: z.lazy(() => RequestTypeSchema),
        dateCreated: z.coerce.date().optional(),
        dateUpdated: z.coerce.date().optional().nullable(),
        status: z.lazy(() => StatusSchema),
        description: z.string(),
        fromEmployee: z.string(),
        priority: z.lazy(() => PrioritySchema),
        assignedTo: z
            .lazy(() => EmployeeCreateNestedOneWithoutServiceRequestInputObjectSchema)
            .optional(),
        audioVisual: z
            .lazy(() => AudioVisualCreateNestedOneWithoutServiceRequestInputObjectSchema)
            .optional(),
        externalTransportation: z
            .lazy(() => ExternalTransportationCreateNestedOneWithoutServiceRequestInputObjectSchema)
            .optional(),
        language: z
            .lazy(() => LanguageCreateNestedOneWithoutServiceRequestInputObjectSchema)
            .optional(),
        security: z
            .lazy(() => SecurityCreateNestedOneWithoutServiceRequestInputObjectSchema)
            .optional(),
    })
    .strict();

export const ServiceRequestCreateWithoutEquipmentDeliveryInputObjectSchema = Schema;
