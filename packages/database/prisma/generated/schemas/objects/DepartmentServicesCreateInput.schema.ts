import { z } from 'zod';
import { DepartmentCreateNestedOneWithoutDepartmentServicesInputObjectSchema } from './DepartmentCreateNestedOneWithoutDepartmentServicesInput.schema';
import { ServiceCreateNestedOneWithoutDepartmentServicesInputObjectSchema } from './ServiceCreateNestedOneWithoutDepartmentServicesInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.DepartmentServicesCreateInput> = z
    .object({
        department: z.lazy(
            () => DepartmentCreateNestedOneWithoutDepartmentServicesInputObjectSchema
        ),
        service: z.lazy(() => ServiceCreateNestedOneWithoutDepartmentServicesInputObjectSchema),
    })
    .strict();

export const DepartmentServicesCreateInputObjectSchema = Schema;
