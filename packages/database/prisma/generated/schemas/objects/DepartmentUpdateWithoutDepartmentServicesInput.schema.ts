import { z } from 'zod';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { LocationUpdateManyWithoutDepartmentNestedInputObjectSchema } from './LocationUpdateManyWithoutDepartmentNestedInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.DepartmentUpdateWithoutDepartmentServicesInput> = z
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
        Location: z
            .lazy(() => LocationUpdateManyWithoutDepartmentNestedInputObjectSchema)
            .optional(),
    })
    .strict();

export const DepartmentUpdateWithoutDepartmentServicesInputObjectSchema = Schema;
