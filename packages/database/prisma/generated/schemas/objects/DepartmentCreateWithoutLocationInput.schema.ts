import { z } from 'zod';
import { DepartmentServicesCreateNestedManyWithoutDepartmentInputObjectSchema } from './DepartmentServicesCreateNestedManyWithoutDepartmentInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.DepartmentCreateWithoutLocationInput> = z
    .object({
        name: z.string(),
        description: z.string().optional().nullable(),
        phoneNumber: z.string(),
        DepartmentServices: z
            .lazy(() => DepartmentServicesCreateNestedManyWithoutDepartmentInputObjectSchema)
            .optional(),
    })
    .strict();

export const DepartmentCreateWithoutLocationInputObjectSchema = Schema;
