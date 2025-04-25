import { z } from 'zod';
import { DepartmentServicesUncheckedCreateNestedManyWithoutDepartmentInputObjectSchema } from './DepartmentServicesUncheckedCreateNestedManyWithoutDepartmentInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.DepartmentUncheckedCreateWithoutLocationInput> = z
    .object({
        id: z.number().optional(),
        name: z.string(),
        description: z.string().optional().nullable(),
        phoneNumber: z.string(),
        DepartmentServices: z
            .lazy(
                () => DepartmentServicesUncheckedCreateNestedManyWithoutDepartmentInputObjectSchema
            )
            .optional(),
    })
    .strict();

export const DepartmentUncheckedCreateWithoutLocationInputObjectSchema = Schema;
