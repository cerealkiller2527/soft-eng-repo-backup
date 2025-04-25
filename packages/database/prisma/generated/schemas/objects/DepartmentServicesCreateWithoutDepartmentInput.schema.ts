import { z } from 'zod';
import { ServiceCreateNestedOneWithoutDepartmentServicesInputObjectSchema } from './ServiceCreateNestedOneWithoutDepartmentServicesInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.DepartmentServicesCreateWithoutDepartmentInput> = z
    .object({
        service: z.lazy(() => ServiceCreateNestedOneWithoutDepartmentServicesInputObjectSchema),
    })
    .strict();

export const DepartmentServicesCreateWithoutDepartmentInputObjectSchema = Schema;
