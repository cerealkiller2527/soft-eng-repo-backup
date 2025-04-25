import { z } from 'zod';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { DepartmentServicesUpdateManyWithoutDepartmentNestedInputObjectSchema } from './DepartmentServicesUpdateManyWithoutDepartmentNestedInput.schema';
import { LocationUpdateManyWithoutDepartmentNestedInputObjectSchema } from './LocationUpdateManyWithoutDepartmentNestedInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.DepartmentUpdateInput> = z
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
        Location: z
            .lazy(() => LocationUpdateManyWithoutDepartmentNestedInputObjectSchema)
            .optional(),
    })
    .strict();

export const DepartmentUpdateInputObjectSchema = Schema;
