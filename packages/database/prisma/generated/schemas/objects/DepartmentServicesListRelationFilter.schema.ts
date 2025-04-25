import { z } from 'zod';
import { DepartmentServicesWhereInputObjectSchema } from './DepartmentServicesWhereInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.DepartmentServicesListRelationFilter> = z
    .object({
        every: z.lazy(() => DepartmentServicesWhereInputObjectSchema).optional(),
        some: z.lazy(() => DepartmentServicesWhereInputObjectSchema).optional(),
        none: z.lazy(() => DepartmentServicesWhereInputObjectSchema).optional(),
    })
    .strict();

export const DepartmentServicesListRelationFilterObjectSchema = Schema;
