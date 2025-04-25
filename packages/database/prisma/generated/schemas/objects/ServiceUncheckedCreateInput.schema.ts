import { z } from 'zod';
import { DepartmentServicesUncheckedCreateNestedManyWithoutServiceInputObjectSchema } from './DepartmentServicesUncheckedCreateNestedManyWithoutServiceInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.ServiceUncheckedCreateInput> = z
    .object({
        id: z.number().optional(),
        name: z.string(),
        DepartmentServices: z
            .lazy(() => DepartmentServicesUncheckedCreateNestedManyWithoutServiceInputObjectSchema)
            .optional(),
    })
    .strict();

export const ServiceUncheckedCreateInputObjectSchema = Schema;
