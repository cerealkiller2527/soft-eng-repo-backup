import { z } from 'zod';
import { DepartmentUpdateOneRequiredWithoutDepartmentServicesNestedInputObjectSchema } from './DepartmentUpdateOneRequiredWithoutDepartmentServicesNestedInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.DepartmentServicesUpdateWithoutServiceInput> = z
    .object({
        department: z
            .lazy(() => DepartmentUpdateOneRequiredWithoutDepartmentServicesNestedInputObjectSchema)
            .optional(),
    })
    .strict();

export const DepartmentServicesUpdateWithoutServiceInputObjectSchema = Schema;
