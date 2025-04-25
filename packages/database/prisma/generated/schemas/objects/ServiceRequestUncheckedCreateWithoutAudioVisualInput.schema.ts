import { z } from 'zod';
import { RequestTypeSchema } from '../enums/RequestType.schema';
import { StatusSchema } from '../enums/Status.schema';
import { PrioritySchema } from '../enums/Priority.schema';
import { ExternalTransportationUncheckedCreateNestedOneWithoutServiceRequestInputObjectSchema } from './ExternalTransportationUncheckedCreateNestedOneWithoutServiceRequestInput.schema';
import { EquipmentDeliveryUncheckedCreateNestedOneWithoutServiceRequestInputObjectSchema } from './EquipmentDeliveryUncheckedCreateNestedOneWithoutServiceRequestInput.schema';
import { LanguageUncheckedCreateNestedOneWithoutServiceRequestInputObjectSchema } from './LanguageUncheckedCreateNestedOneWithoutServiceRequestInput.schema';
import { SecurityUncheckedCreateNestedOneWithoutServiceRequestInputObjectSchema } from './SecurityUncheckedCreateNestedOneWithoutServiceRequestInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.ServiceRequestUncheckedCreateWithoutAudioVisualInput> = z
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
        security: z
            .lazy(() => SecurityUncheckedCreateNestedOneWithoutServiceRequestInputObjectSchema)
            .optional(),
    })
    .strict();

export const ServiceRequestUncheckedCreateWithoutAudioVisualInputObjectSchema = Schema;
