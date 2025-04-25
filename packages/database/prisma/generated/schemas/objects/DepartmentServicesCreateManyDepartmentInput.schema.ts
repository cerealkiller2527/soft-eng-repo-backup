import { z } from 'zod';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.DepartmentServicesCreateManyDepartmentInput> = z
    .object({
        serviceID: z.number(),
    })
    .strict();

export const DepartmentServicesCreateManyDepartmentInputObjectSchema = Schema;
