import { z } from 'zod';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.DepartmentServicesCreateManyInput> = z
    .object({
        departmentID: z.number(),
        serviceID: z.number(),
    })
    .strict();

export const DepartmentServicesCreateManyInputObjectSchema = Schema;
