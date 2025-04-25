import { z } from 'zod';
import { DepartmentServicesWhereUniqueInputObjectSchema } from './DepartmentServicesWhereUniqueInput.schema';
import { DepartmentServicesUpdateWithoutDepartmentInputObjectSchema } from './DepartmentServicesUpdateWithoutDepartmentInput.schema';
import { DepartmentServicesUncheckedUpdateWithoutDepartmentInputObjectSchema } from './DepartmentServicesUncheckedUpdateWithoutDepartmentInput.schema';
import { DepartmentServicesCreateWithoutDepartmentInputObjectSchema } from './DepartmentServicesCreateWithoutDepartmentInput.schema';
import { DepartmentServicesUncheckedCreateWithoutDepartmentInputObjectSchema } from './DepartmentServicesUncheckedCreateWithoutDepartmentInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.DepartmentServicesUpsertWithWhereUniqueWithoutDepartmentInput> = z
    .object({
        where: z.lazy(() => DepartmentServicesWhereUniqueInputObjectSchema),
        update: z.union([
            z.lazy(() => DepartmentServicesUpdateWithoutDepartmentInputObjectSchema),
            z.lazy(() => DepartmentServicesUncheckedUpdateWithoutDepartmentInputObjectSchema),
        ]),
        create: z.union([
            z.lazy(() => DepartmentServicesCreateWithoutDepartmentInputObjectSchema),
            z.lazy(() => DepartmentServicesUncheckedCreateWithoutDepartmentInputObjectSchema),
        ]),
    })
    .strict();

export const DepartmentServicesUpsertWithWhereUniqueWithoutDepartmentInputObjectSchema = Schema;
