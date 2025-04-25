import { z } from 'zod';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { DepartmentServicesUpdateManyWithoutServiceNestedInputObjectSchema } from './DepartmentServicesUpdateManyWithoutServiceNestedInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.ServiceUpdateInput> = z
    .object({
        name: z
            .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
            .optional(),
        DepartmentServices: z
            .lazy(() => DepartmentServicesUpdateManyWithoutServiceNestedInputObjectSchema)
            .optional(),
    })
    .strict();

export const ServiceUpdateInputObjectSchema = Schema;
