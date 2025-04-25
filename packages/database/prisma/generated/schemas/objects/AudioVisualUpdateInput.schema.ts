import { z } from 'zod';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { ServiceRequestUpdateOneRequiredWithoutAudioVisualNestedInputObjectSchema } from './ServiceRequestUpdateOneRequiredWithoutAudioVisualNestedInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.AudioVisualUpdateInput> = z
    .object({
        location: z
            .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
            .optional(),
        deadline: z
            .union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)])
            .optional(),
        audiovisualType: z
            .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
            .optional(),
        serviceRequest: z
            .lazy(() => ServiceRequestUpdateOneRequiredWithoutAudioVisualNestedInputObjectSchema)
            .optional(),
    })
    .strict();

export const AudioVisualUpdateInputObjectSchema = Schema;
