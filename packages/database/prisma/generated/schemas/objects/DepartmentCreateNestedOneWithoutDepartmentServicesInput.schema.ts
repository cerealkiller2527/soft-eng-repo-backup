import { z } from 'zod';
import { DepartmentCreateWithoutDepartmentServicesInputObjectSchema } from './DepartmentCreateWithoutDepartmentServicesInput.schema';
import { DepartmentUncheckedCreateWithoutDepartmentServicesInputObjectSchema } from './DepartmentUncheckedCreateWithoutDepartmentServicesInput.schema';
import { DepartmentCreateOrConnectWithoutDepartmentServicesInputObjectSchema } from './DepartmentCreateOrConnectWithoutDepartmentServicesInput.schema';
import { DepartmentWhereUniqueInputObjectSchema } from './DepartmentWhereUniqueInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.DepartmentCreateNestedOneWithoutDepartmentServicesInput> = z
    .object({
        create: z
            .union([
                z.lazy(() => DepartmentCreateWithoutDepartmentServicesInputObjectSchema),
                z.lazy(() => DepartmentUncheckedCreateWithoutDepartmentServicesInputObjectSchema),
            ])
            .optional(),
        connectOrCreate: z
            .lazy(() => DepartmentCreateOrConnectWithoutDepartmentServicesInputObjectSchema)
            .optional(),
        connect: z.lazy(() => DepartmentWhereUniqueInputObjectSchema).optional(),
    })
    .strict();

export const DepartmentCreateNestedOneWithoutDepartmentServicesInputObjectSchema = Schema;
