import { z } from 'zod';
import { IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { EmployeeUpdatecanServiceInputObjectSchema } from './EmployeeUpdatecanServiceInput.schema';
import { RequestTypeSchema } from '../enums/RequestType.schema';
import { EmployeeUpdatelanguageInputObjectSchema } from './EmployeeUpdatelanguageInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.EmployeeUncheckedUpdateWithoutServiceRequestInput> = z
    .object({
        id: z
            .union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)])
            .optional(),
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
    })
    .strict();

export const EmployeeUncheckedUpdateWithoutServiceRequestInputObjectSchema = Schema;
