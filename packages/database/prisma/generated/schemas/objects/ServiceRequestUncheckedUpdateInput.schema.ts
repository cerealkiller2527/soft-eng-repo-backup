import { z } from 'zod';
import { IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { RequestTypeSchema } from '../enums/RequestType.schema';
import { EnumRequestTypeFieldUpdateOperationsInputObjectSchema } from './EnumRequestTypeFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { NullableDateTimeFieldUpdateOperationsInputObjectSchema } from './NullableDateTimeFieldUpdateOperationsInput.schema';
import { StatusSchema } from '../enums/Status.schema';
import { EnumStatusFieldUpdateOperationsInputObjectSchema } from './EnumStatusFieldUpdateOperationsInput.schema';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableIntFieldUpdateOperationsInputObjectSchema } from './NullableIntFieldUpdateOperationsInput.schema';
import { PrioritySchema } from '../enums/Priority.schema';
import { EnumPriorityFieldUpdateOperationsInputObjectSchema } from './EnumPriorityFieldUpdateOperationsInput.schema';
import { AudioVisualUncheckedUpdateOneWithoutServiceRequestNestedInputObjectSchema } from './AudioVisualUncheckedUpdateOneWithoutServiceRequestNestedInput.schema';
import { ExternalTransportationUncheckedUpdateOneWithoutServiceRequestNestedInputObjectSchema } from './ExternalTransportationUncheckedUpdateOneWithoutServiceRequestNestedInput.schema';
import { EquipmentDeliveryUncheckedUpdateOneWithoutServiceRequestNestedInputObjectSchema } from './EquipmentDeliveryUncheckedUpdateOneWithoutServiceRequestNestedInput.schema';
import { LanguageUncheckedUpdateOneWithoutServiceRequestNestedInputObjectSchema } from './LanguageUncheckedUpdateOneWithoutServiceRequestNestedInput.schema';
import { SecurityUncheckedUpdateOneWithoutServiceRequestNestedInputObjectSchema } from './SecurityUncheckedUpdateOneWithoutServiceRequestNestedInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.ServiceRequestUncheckedUpdateInput> = z
    .object({
        id: z
            .union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)])
            .optional(),
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
        assignedEmployeeID: z
            .union([z.number(), z.lazy(() => NullableIntFieldUpdateOperationsInputObjectSchema)])
            .optional()
            .nullable(),
        fromEmployee: z
            .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
            .optional(),
        priority: z
            .union([
                z.lazy(() => PrioritySchema),
                z.lazy(() => EnumPriorityFieldUpdateOperationsInputObjectSchema),
            ])
            .optional(),
        audioVisual: z
            .lazy(() => AudioVisualUncheckedUpdateOneWithoutServiceRequestNestedInputObjectSchema)
            .optional(),
        externalTransportation: z
            .lazy(
                () =>
                    ExternalTransportationUncheckedUpdateOneWithoutServiceRequestNestedInputObjectSchema
            )
            .optional(),
        equipmentDelivery: z
            .lazy(
                () =>
                    EquipmentDeliveryUncheckedUpdateOneWithoutServiceRequestNestedInputObjectSchema
            )
            .optional(),
        language: z
            .lazy(() => LanguageUncheckedUpdateOneWithoutServiceRequestNestedInputObjectSchema)
            .optional(),
        security: z
            .lazy(() => SecurityUncheckedUpdateOneWithoutServiceRequestNestedInputObjectSchema)
            .optional(),
    })
    .strict();

export const ServiceRequestUncheckedUpdateInputObjectSchema = Schema;
