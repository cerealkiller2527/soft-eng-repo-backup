import { z } from 'zod';
import { DepartmentCreateNestedOneWithoutDepartmentServicesInputObjectSchema } from './DepartmentCreateNestedOneWithoutDepartmentServicesInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.DepartmentServicesCreateWithoutServiceInput> = z
    .object({
        department: z.lazy(
            () => DepartmentCreateNestedOneWithoutDepartmentServicesInputObjectSchema
        ),
    })
    .strict();

export const DepartmentServicesCreateWithoutServiceInputObjectSchema = Schema;
