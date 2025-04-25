import { z } from 'zod';
import { IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { DepartmentServicesUncheckedUpdateManyWithoutServiceNestedInputObjectSchema } from './DepartmentServicesUncheckedUpdateManyWithoutServiceNestedInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.ServiceUncheckedUpdateInput> = z
    .object({
        id: z
            .union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)])
            .optional(),
        name: z
            .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
            .optional(),
        DepartmentServices: z
            .lazy(() => DepartmentServicesUncheckedUpdateManyWithoutServiceNestedInputObjectSchema)
            .optional(),
    })
    .strict();

export const ServiceUncheckedUpdateInputObjectSchema = Schema;
