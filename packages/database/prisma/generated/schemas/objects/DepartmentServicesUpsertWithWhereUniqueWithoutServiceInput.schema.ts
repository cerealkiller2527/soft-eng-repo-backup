import { z } from 'zod';
import { DepartmentServicesWhereUniqueInputObjectSchema } from './DepartmentServicesWhereUniqueInput.schema';
import { DepartmentServicesUpdateWithoutServiceInputObjectSchema } from './DepartmentServicesUpdateWithoutServiceInput.schema';
import { DepartmentServicesUncheckedUpdateWithoutServiceInputObjectSchema } from './DepartmentServicesUncheckedUpdateWithoutServiceInput.schema';
import { DepartmentServicesCreateWithoutServiceInputObjectSchema } from './DepartmentServicesCreateWithoutServiceInput.schema';
import { DepartmentServicesUncheckedCreateWithoutServiceInputObjectSchema } from './DepartmentServicesUncheckedCreateWithoutServiceInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.DepartmentServicesUpsertWithWhereUniqueWithoutServiceInput> = z
    .object({
        where: z.lazy(() => DepartmentServicesWhereUniqueInputObjectSchema),
        update: z.union([
            z.lazy(() => DepartmentServicesUpdateWithoutServiceInputObjectSchema),
            z.lazy(() => DepartmentServicesUncheckedUpdateWithoutServiceInputObjectSchema),
        ]),
        create: z.union([
            z.lazy(() => DepartmentServicesCreateWithoutServiceInputObjectSchema),
            z.lazy(() => DepartmentServicesUncheckedCreateWithoutServiceInputObjectSchema),
        ]),
    })
    .strict();

export const DepartmentServicesUpsertWithWhereUniqueWithoutServiceInputObjectSchema = Schema;
