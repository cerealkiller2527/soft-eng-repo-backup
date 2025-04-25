import { z } from 'zod';
import { DepartmentServicesUncheckedCreateNestedManyWithoutDepartmentInputObjectSchema } from './DepartmentServicesUncheckedCreateNestedManyWithoutDepartmentInput.schema';
import { LocationUncheckedCreateNestedManyWithoutDepartmentInputObjectSchema } from './LocationUncheckedCreateNestedManyWithoutDepartmentInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.DepartmentUncheckedCreateInput> = z
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
        Location: z
            .lazy(() => LocationUncheckedCreateNestedManyWithoutDepartmentInputObjectSchema)
            .optional(),
    })
    .strict();

export const DepartmentUncheckedCreateInputObjectSchema = Schema;
