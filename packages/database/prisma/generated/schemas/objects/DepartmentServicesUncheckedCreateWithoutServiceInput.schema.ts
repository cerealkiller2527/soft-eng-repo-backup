import { z } from 'zod';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.DepartmentServicesUncheckedCreateWithoutServiceInput> = z
    .object({
        departmentID: z.number(),
    })
    .strict();

export const DepartmentServicesUncheckedCreateWithoutServiceInputObjectSchema = Schema;
