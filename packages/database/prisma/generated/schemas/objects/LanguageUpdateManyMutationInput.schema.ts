import { z } from 'zod';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.LanguageUpdateManyMutationInput> = z
    .object({
        location: z
            .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
            .optional(),
        language: z
            .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
            .optional(),
        startTime: z
            .union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)])
            .optional(),
        endTime: z
            .union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)])
            .optional(),
    })
    .strict();

export const LanguageUpdateManyMutationInputObjectSchema = Schema;
