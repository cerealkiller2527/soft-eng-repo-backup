import { z } from 'zod';
import { DepartmentServicesWhereUniqueInputObjectSchema } from './DepartmentServicesWhereUniqueInput.schema';
import { DepartmentServicesCreateWithoutServiceInputObjectSchema } from './DepartmentServicesCreateWithoutServiceInput.schema';
import { DepartmentServicesUncheckedCreateWithoutServiceInputObjectSchema } from './DepartmentServicesUncheckedCreateWithoutServiceInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.DepartmentServicesCreateOrConnectWithoutServiceInput> = z
    .object({
        where: z.lazy(() => DepartmentServicesWhereUniqueInputObjectSchema),
        create: z.union([
            z.lazy(() => DepartmentServicesCreateWithoutServiceInputObjectSchema),
            z.lazy(() => DepartmentServicesUncheckedCreateWithoutServiceInputObjectSchema),
        ]),
    })
    .strict();

export const DepartmentServicesCreateOrConnectWithoutServiceInputObjectSchema = Schema;
