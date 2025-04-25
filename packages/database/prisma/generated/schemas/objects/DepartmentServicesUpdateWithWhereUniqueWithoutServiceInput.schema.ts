import { z } from 'zod';
import { DepartmentServicesWhereUniqueInputObjectSchema } from './DepartmentServicesWhereUniqueInput.schema';
import { DepartmentServicesUpdateWithoutServiceInputObjectSchema } from './DepartmentServicesUpdateWithoutServiceInput.schema';
import { DepartmentServicesUncheckedUpdateWithoutServiceInputObjectSchema } from './DepartmentServicesUncheckedUpdateWithoutServiceInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.DepartmentServicesUpdateWithWhereUniqueWithoutServiceInput> = z
    .object({
        where: z.lazy(() => DepartmentServicesWhereUniqueInputObjectSchema),
        data: z.union([
            z.lazy(() => DepartmentServicesUpdateWithoutServiceInputObjectSchema),
            z.lazy(() => DepartmentServicesUncheckedUpdateWithoutServiceInputObjectSchema),
        ]),
    })
    .strict();

export const DepartmentServicesUpdateWithWhereUniqueWithoutServiceInputObjectSchema = Schema;
