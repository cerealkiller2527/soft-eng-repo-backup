import { z } from 'zod';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.DepartmentServicesUncheckedCreateWithoutDepartmentInput> = z
    .object({
        serviceID: z.number(),
    })
    .strict();

export const DepartmentServicesUncheckedCreateWithoutDepartmentInputObjectSchema = Schema;
