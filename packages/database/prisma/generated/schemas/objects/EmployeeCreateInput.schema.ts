import { z } from 'zod';
import { EmployeeCreatecanServiceInputObjectSchema } from './EmployeeCreatecanServiceInput.schema';
import { RequestTypeSchema } from '../enums/RequestType.schema';
import { EmployeeCreatelanguageInputObjectSchema } from './EmployeeCreatelanguageInput.schema';
import { ServiceRequestCreateNestedManyWithoutAssignedToInputObjectSchema } from './ServiceRequestCreateNestedManyWithoutAssignedToInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.EmployeeCreateInput> = z
    .object({
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
            .lazy(() => ServiceRequestCreateNestedManyWithoutAssignedToInputObjectSchema)
            .optional(),
    })
    .strict();

export const EmployeeCreateInputObjectSchema = Schema;
