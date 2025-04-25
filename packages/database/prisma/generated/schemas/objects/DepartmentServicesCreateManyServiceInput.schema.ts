import { z } from 'zod';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.DepartmentServicesCreateManyServiceInput> = z
    .object({
        departmentID: z.number(),
    })
    .strict();

export const DepartmentServicesCreateManyServiceInputObjectSchema = Schema;
