import { z } from 'zod';
import { DepartmentServicesCreateNestedManyWithoutDepartmentInputObjectSchema } from './DepartmentServicesCreateNestedManyWithoutDepartmentInput.schema';
import { LocationCreateNestedManyWithoutDepartmentInputObjectSchema } from './LocationCreateNestedManyWithoutDepartmentInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.DepartmentCreateInput> = z
    .object({
        name: z.string(),
        description: z.string().optional().nullable(),
        phoneNumber: z.string(),
        DepartmentServices: z
            .lazy(() => DepartmentServicesCreateNestedManyWithoutDepartmentInputObjectSchema)
            .optional(),
        Location: z
            .lazy(() => LocationCreateNestedManyWithoutDepartmentInputObjectSchema)
            .optional(),
    })
    .strict();

export const DepartmentCreateInputObjectSchema = Schema;
