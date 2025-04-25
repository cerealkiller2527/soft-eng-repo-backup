import { z } from 'zod';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { ServiceRequestUpdateOneRequiredWithoutSecurityNestedInputObjectSchema } from './ServiceRequestUpdateOneRequiredWithoutSecurityNestedInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.SecurityUpdateInput> = z
    .object({
        location: z
            .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
            .optional(),
        serviceRequest: z
            .lazy(() => ServiceRequestUpdateOneRequiredWithoutSecurityNestedInputObjectSchema)
            .optional(),
    })
    .strict();

export const SecurityUpdateInputObjectSchema = Schema;
