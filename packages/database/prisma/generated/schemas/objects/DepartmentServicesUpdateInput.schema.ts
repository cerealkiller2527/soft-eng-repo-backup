import { z } from 'zod';
import { DepartmentUpdateOneRequiredWithoutDepartmentServicesNestedInputObjectSchema } from './DepartmentUpdateOneRequiredWithoutDepartmentServicesNestedInput.schema';
import { ServiceUpdateOneRequiredWithoutDepartmentServicesNestedInputObjectSchema } from './ServiceUpdateOneRequiredWithoutDepartmentServicesNestedInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.DepartmentServicesUpdateInput> = z
    .object({
        department: z
            .lazy(() => DepartmentUpdateOneRequiredWithoutDepartmentServicesNestedInputObjectSchema)
            .optional(),
        service: z
            .lazy(() => ServiceUpdateOneRequiredWithoutDepartmentServicesNestedInputObjectSchema)
            .optional(),
    })
    .strict();

export const DepartmentServicesUpdateInputObjectSchema = Schema;
