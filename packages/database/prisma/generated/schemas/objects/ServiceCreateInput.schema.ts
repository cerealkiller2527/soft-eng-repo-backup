import { z } from 'zod';
import { DepartmentServicesCreateNestedManyWithoutServiceInputObjectSchema } from './DepartmentServicesCreateNestedManyWithoutServiceInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.ServiceCreateInput> = z
    .object({
        name: z.string(),
        DepartmentServices: z
            .lazy(() => DepartmentServicesCreateNestedManyWithoutServiceInputObjectSchema)
            .optional(),
    })
    .strict();

export const ServiceCreateInputObjectSchema = Schema;
