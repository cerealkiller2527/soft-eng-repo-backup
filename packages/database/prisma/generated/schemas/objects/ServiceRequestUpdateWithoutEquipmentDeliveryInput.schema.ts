import { z } from 'zod';
import { RequestTypeSchema } from '../enums/RequestType.schema';
import { EnumRequestTypeFieldUpdateOperationsInputObjectSchema } from './EnumRequestTypeFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { NullableDateTimeFieldUpdateOperationsInputObjectSchema } from './NullableDateTimeFieldUpdateOperationsInput.schema';
import { StatusSchema } from '../enums/Status.schema';
import { EnumStatusFieldUpdateOperationsInputObjectSchema } from './EnumStatusFieldUpdateOperationsInput.schema';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { PrioritySchema } from '../enums/Priority.schema';
import { EnumPriorityFieldUpdateOperationsInputObjectSchema } from './EnumPriorityFieldUpdateOperationsInput.schema';
import { EmployeeUpdateOneWithoutServiceRequestNestedInputObjectSchema } from './EmployeeUpdateOneWithoutServiceRequestNestedInput.schema';
import { AudioVisualUpdateOneWithoutServiceRequestNestedInputObjectSchema } from './AudioVisualUpdateOneWithoutServiceRequestNestedInput.schema';
import { ExternalTransportationUpdateOneWithoutServiceRequestNestedInputObjectSchema } from './ExternalTransportationUpdateOneWithoutServiceRequestNestedInput.schema';
import { LanguageUpdateOneWithoutServiceRequestNestedInputObjectSchema } from './LanguageUpdateOneWithoutServiceRequestNestedInput.schema';
import { SecurityUpdateOneWithoutServiceRequestNestedInputObjectSchema } from './SecurityUpdateOneWithoutServiceRequestNestedInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.ServiceRequestUpdateWithoutEquipmentDeliveryInput> = z
    .object({
        type: z
            .union([
                z.lazy(() => RequestTypeSchema),
                z.lazy(() => EnumRequestTypeFieldUpdateOperationsInputObjectSchema),
            ])
            .optional(),
        dateCreated: z
            .union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)])
            .optional(),
        dateUpdated: z
            .union([
                z.coerce.date(),
                z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema),
            ])
            .optional()
            .nullable(),
        status: z
            .union([
                z.lazy(() => StatusSchema),
                z.lazy(() => EnumStatusFieldUpdateOperationsInputObjectSchema),
            ])
            .optional(),
        description: z
            .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
            .optional(),
        fromEmployee: z
            .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
            .optional(),
        priority: z
            .union([
                z.lazy(() => PrioritySchema),
                z.lazy(() => EnumPriorityFieldUpdateOperationsInputObjectSchema),
            ])
            .optional(),
        assignedTo: z
            .lazy(() => EmployeeUpdateOneWithoutServiceRequestNestedInputObjectSchema)
            .optional(),
        audioVisual: z
            .lazy(() => AudioVisualUpdateOneWithoutServiceRequestNestedInputObjectSchema)
            .optional(),
        externalTransportation: z
            .lazy(() => ExternalTransportationUpdateOneWithoutServiceRequestNestedInputObjectSchema)
            .optional(),
        language: z
            .lazy(() => LanguageUpdateOneWithoutServiceRequestNestedInputObjectSchema)
            .optional(),
        security: z
            .lazy(() => SecurityUpdateOneWithoutServiceRequestNestedInputObjectSchema)
            .optional(),
    })
    .strict();

export const ServiceRequestUpdateWithoutEquipmentDeliveryInputObjectSchema = Schema;
