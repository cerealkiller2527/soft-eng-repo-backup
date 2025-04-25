import { z } from 'zod';
import { ServiceUpdateOneRequiredWithoutDepartmentServicesNestedInputObjectSchema } from './ServiceUpdateOneRequiredWithoutDepartmentServicesNestedInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.DepartmentServicesUpdateWithoutDepartmentInput> = z
    .object({
        service: z
            .lazy(() => ServiceUpdateOneRequiredWithoutDepartmentServicesNestedInputObjectSchema)
            .optional(),
    })
    .strict();

export const DepartmentServicesUpdateWithoutDepartmentInputObjectSchema = Schema;
