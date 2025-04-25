import { z } from 'zod';
import { DepartmentWhereUniqueInputObjectSchema } from './DepartmentWhereUniqueInput.schema';
import { DepartmentCreateWithoutDepartmentServicesInputObjectSchema } from './DepartmentCreateWithoutDepartmentServicesInput.schema';
import { DepartmentUncheckedCreateWithoutDepartmentServicesInputObjectSchema } from './DepartmentUncheckedCreateWithoutDepartmentServicesInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.DepartmentCreateOrConnectWithoutDepartmentServicesInput> = z
    .object({
        where: z.lazy(() => DepartmentWhereUniqueInputObjectSchema),
        create: z.union([
            z.lazy(() => DepartmentCreateWithoutDepartmentServicesInputObjectSchema),
            z.lazy(() => DepartmentUncheckedCreateWithoutDepartmentServicesInputObjectSchema),
        ]),
    })
    .strict();

export const DepartmentCreateOrConnectWithoutDepartmentServicesInputObjectSchema = Schema;
