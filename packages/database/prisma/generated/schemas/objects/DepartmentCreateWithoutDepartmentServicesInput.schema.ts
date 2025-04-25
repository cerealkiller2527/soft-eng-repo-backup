import { z } from 'zod';
import { LocationCreateNestedManyWithoutDepartmentInputObjectSchema } from './LocationCreateNestedManyWithoutDepartmentInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.DepartmentCreateWithoutDepartmentServicesInput> = z
    .object({
        name: z.string(),
        description: z.string().optional().nullable(),
        phoneNumber: z.string(),
        Location: z
            .lazy(() => LocationCreateNestedManyWithoutDepartmentInputObjectSchema)
            .optional(),
    })
    .strict();

export const DepartmentCreateWithoutDepartmentServicesInputObjectSchema = Schema;
