import { z } from 'zod';
import { DepartmentUpdateWithoutDepartmentServicesInputObjectSchema } from './DepartmentUpdateWithoutDepartmentServicesInput.schema';
import { DepartmentUncheckedUpdateWithoutDepartmentServicesInputObjectSchema } from './DepartmentUncheckedUpdateWithoutDepartmentServicesInput.schema';
import { DepartmentCreateWithoutDepartmentServicesInputObjectSchema } from './DepartmentCreateWithoutDepartmentServicesInput.schema';
import { DepartmentUncheckedCreateWithoutDepartmentServicesInputObjectSchema } from './DepartmentUncheckedCreateWithoutDepartmentServicesInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.DepartmentUpsertWithoutDepartmentServicesInput> = z
    .object({
        update: z.union([
            z.lazy(() => DepartmentUpdateWithoutDepartmentServicesInputObjectSchema),
            z.lazy(() => DepartmentUncheckedUpdateWithoutDepartmentServicesInputObjectSchema),
        ]),
        create: z.union([
            z.lazy(() => DepartmentCreateWithoutDepartmentServicesInputObjectSchema),
            z.lazy(() => DepartmentUncheckedCreateWithoutDepartmentServicesInputObjectSchema),
        ]),
    })
    .strict();

export const DepartmentUpsertWithoutDepartmentServicesInputObjectSchema = Schema;
