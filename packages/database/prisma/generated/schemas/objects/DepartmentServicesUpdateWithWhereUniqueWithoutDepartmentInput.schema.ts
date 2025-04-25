import { z } from 'zod';
import { DepartmentServicesWhereUniqueInputObjectSchema } from './DepartmentServicesWhereUniqueInput.schema';
import { DepartmentServicesUpdateWithoutDepartmentInputObjectSchema } from './DepartmentServicesUpdateWithoutDepartmentInput.schema';
import { DepartmentServicesUncheckedUpdateWithoutDepartmentInputObjectSchema } from './DepartmentServicesUncheckedUpdateWithoutDepartmentInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.DepartmentServicesUpdateWithWhereUniqueWithoutDepartmentInput> = z
    .object({
        where: z.lazy(() => DepartmentServicesWhereUniqueInputObjectSchema),
        data: z.union([
            z.lazy(() => DepartmentServicesUpdateWithoutDepartmentInputObjectSchema),
            z.lazy(() => DepartmentServicesUncheckedUpdateWithoutDepartmentInputObjectSchema),
        ]),
    })
    .strict();

export const DepartmentServicesUpdateWithWhereUniqueWithoutDepartmentInputObjectSchema = Schema;
