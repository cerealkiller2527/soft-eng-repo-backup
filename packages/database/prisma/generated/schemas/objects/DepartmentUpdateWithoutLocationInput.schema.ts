import { z } from 'zod';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { DepartmentServicesUpdateManyWithoutDepartmentNestedInputObjectSchema } from './DepartmentServicesUpdateManyWithoutDepartmentNestedInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.DepartmentUpdateWithoutLocationInput> = z
    .object({
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
            .lazy(() => DepartmentServicesUpdateManyWithoutDepartmentNestedInputObjectSchema)
            .optional(),
    })
    .strict();

export const DepartmentUpdateWithoutLocationInputObjectSchema = Schema;
