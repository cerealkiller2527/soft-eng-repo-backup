import { z } from 'zod';
import { RequestTypeSchema } from '../enums/RequestType.schema';
import { StatusSchema } from '../enums/Status.schema';
import { PrioritySchema } from '../enums/Priority.schema';
import { AudioVisualUncheckedCreateNestedOneWithoutServiceRequestInputObjectSchema } from './AudioVisualUncheckedCreateNestedOneWithoutServiceRequestInput.schema';
import { ExternalTransportationUncheckedCreateNestedOneWithoutServiceRequestInputObjectSchema } from './ExternalTransportationUncheckedCreateNestedOneWithoutServiceRequestInput.schema';
import { EquipmentDeliveryUncheckedCreateNestedOneWithoutServiceRequestInputObjectSchema } from './EquipmentDeliveryUncheckedCreateNestedOneWithoutServiceRequestInput.schema';
import { LanguageUncheckedCreateNestedOneWithoutServiceRequestInputObjectSchema } from './LanguageUncheckedCreateNestedOneWithoutServiceRequestInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.ServiceRequestUncheckedCreateWithoutSecurityInput> = z
    .object({
        id: z.number().optional(),
        type: z.lazy(() => RequestTypeSchema),
        dateCreated: z.coerce.date().optional(),
        dateUpdated: z.coerce.date().optional().nullable(),
        status: z.lazy(() => StatusSchema),
        description: z.string(),
        assignedEmployeeID: z.number().optional().nullable(),
        fromEmployee: z.string(),
        priority: z.lazy(() => PrioritySchema),
        audioVisual: z
            .lazy(() => AudioVisualUncheckedCreateNestedOneWithoutServiceRequestInputObjectSchema)
            .optional(),
        externalTransportation: z
            .lazy(
                () =>
                    ExternalTransportationUncheckedCreateNestedOneWithoutServiceRequestInputObjectSchema
            )
            .optional(),
        equipmentDelivery: z
            .lazy(
                () =>
                    EquipmentDeliveryUncheckedCreateNestedOneWithoutServiceRequestInputObjectSchema
            )
            .optional(),
        language: z
            .lazy(() => LanguageUncheckedCreateNestedOneWithoutServiceRequestInputObjectSchema)
            .optional(),
    })
    .strict();

export const ServiceRequestUncheckedCreateWithoutSecurityInputObjectSchema = Schema;
