import { z } from 'zod';
import { LocationUncheckedCreateNestedManyWithoutDepartmentInputObjectSchema } from './LocationUncheckedCreateNestedManyWithoutDepartmentInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.DepartmentUncheckedCreateWithoutDepartmentServicesInput> = z
    .object({
        id: z.number().optional(),
        name: z.string(),
        description: z.string().optional().nullable(),
        phoneNumber: z.string(),
        Location: z
            .lazy(() => LocationUncheckedCreateNestedManyWithoutDepartmentInputObjectSchema)
            .optional(),
    })
    .strict();

export const DepartmentUncheckedCreateWithoutDepartmentServicesInputObjectSchema = Schema;
