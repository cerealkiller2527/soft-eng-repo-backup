import { z } from 'zod';
import { EmployeeCreatecanServiceInputObjectSchema } from './EmployeeCreatecanServiceInput.schema';
import { RequestTypeSchema } from '../enums/RequestType.schema';
import { EmployeeCreatelanguageInputObjectSchema } from './EmployeeCreatelanguageInput.schema';
import { ServiceRequestUncheckedCreateNestedManyWithoutAssignedToInputObjectSchema } from './ServiceRequestUncheckedCreateNestedManyWithoutAssignedToInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.EmployeeUncheckedCreateInput> = z
    .object({
        id: z.number().optional(),
        name: z.string(),
        employeeType: z.string(),
        canService: z
            .union([
                z.lazy(() => EmployeeCreatecanServiceInputObjectSchema),
                z.lazy(() => RequestTypeSchema).array(),
            ])
            .optional(),
        language: z
            .union([z.lazy(() => EmployeeCreatelanguageInputObjectSchema), z.string().array()])
            .optional(),
        ServiceRequest: z
            .lazy(() => ServiceRequestUncheckedCreateNestedManyWithoutAssignedToInputObjectSchema)
            .optional(),
    })
    .strict();

export const EmployeeUncheckedCreateInputObjectSchema = Schema;
