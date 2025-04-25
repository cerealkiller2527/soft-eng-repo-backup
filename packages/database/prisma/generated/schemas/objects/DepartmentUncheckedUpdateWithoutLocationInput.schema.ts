import { z } from 'zod';
import { IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { DepartmentServicesUncheckedUpdateManyWithoutDepartmentNestedInputObjectSchema } from './DepartmentServicesUncheckedUpdateManyWithoutDepartmentNestedInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.DepartmentUncheckedUpdateWithoutLocationInput> = z
    .object({
        id: z
            .union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)])
            .optional(),
        name: z
            .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
            .optional(),
        description: z
            .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)])
            .optional()
            .nullable(),
        phoneNumber: z
            .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
            .optional(),
        DepartmentServices: z
            .lazy(
                () => DepartmentServicesUncheckedUpdateManyWithoutDepartmentNestedInputObjectSchema
            )
            .optional(),
    })
    .strict();

export const DepartmentUncheckedUpdateWithoutLocationInputObjectSchema = Schema;
