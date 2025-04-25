import { z } from 'zod';
import { DepartmentServicesWhereUniqueInputObjectSchema } from './DepartmentServicesWhereUniqueInput.schema';
import { DepartmentServicesCreateWithoutDepartmentInputObjectSchema } from './DepartmentServicesCreateWithoutDepartmentInput.schema';
import { DepartmentServicesUncheckedCreateWithoutDepartmentInputObjectSchema } from './DepartmentServicesUncheckedCreateWithoutDepartmentInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.DepartmentServicesCreateOrConnectWithoutDepartmentInput> = z
    .object({
        where: z.lazy(() => DepartmentServicesWhereUniqueInputObjectSchema),
        create: z.union([
            z.lazy(() => DepartmentServicesCreateWithoutDepartmentInputObjectSchema),
            z.lazy(() => DepartmentServicesUncheckedCreateWithoutDepartmentInputObjectSchema),
        ]),
    })
    .strict();

export const DepartmentServicesCreateOrConnectWithoutDepartmentInputObjectSchema = Schema;
