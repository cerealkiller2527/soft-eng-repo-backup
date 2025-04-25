import { z } from 'zod';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { ServiceRequestUpdateOneRequiredWithoutExternalTransportationNestedInputObjectSchema } from './ServiceRequestUpdateOneRequiredWithoutExternalTransportationNestedInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.ExternalTransportationUpdateInput> = z
    .object({
        fromWhere: z
            .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
            .optional(),
        toWhere: z
            .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
            .optional(),
        transportType: z
            .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
            .optional(),
        patientName: z
            .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
            .optional(),
        pickupTime: z
            .union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)])
            .optional(),
        serviceRequest: z
            .lazy(
                () =>
                    ServiceRequestUpdateOneRequiredWithoutExternalTransportationNestedInputObjectSchema
            )
            .optional(),
    })
    .strict();

export const ExternalTransportationUpdateInputObjectSchema = Schema;
