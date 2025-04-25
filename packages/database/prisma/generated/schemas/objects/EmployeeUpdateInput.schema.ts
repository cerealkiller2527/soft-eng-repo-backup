import { z } from 'zod';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { EmployeeUpdatecanServiceInputObjectSchema } from './EmployeeUpdatecanServiceInput.schema';
import { RequestTypeSchema } from '../enums/RequestType.schema';
import { EmployeeUpdatelanguageInputObjectSchema } from './EmployeeUpdatelanguageInput.schema';
import { ServiceRequestUpdateManyWithoutAssignedToNestedInputObjectSchema } from './ServiceRequestUpdateManyWithoutAssignedToNestedInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.EmployeeUpdateInput> = z
    .object({
        name: z
            .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
            .optional(),
        employeeType: z
            .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
            .optional(),
        canService: z
            .union([
                z.lazy(() => EmployeeUpdatecanServiceInputObjectSchema),
                z.lazy(() => RequestTypeSchema).array(),
            ])
            .optional(),
        language: z
            .union([z.lazy(() => EmployeeUpdatelanguageInputObjectSchema), z.string().array()])
            .optional(),
        ServiceRequest: z
            .lazy(() => ServiceRequestUpdateManyWithoutAssignedToNestedInputObjectSchema)
            .optional(),
    })
    .strict();

export const EmployeeUpdateInputObjectSchema = Schema;
