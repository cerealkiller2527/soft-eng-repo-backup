import { z } from 'zod';
import { DepartmentServicesScalarWhereInputObjectSchema } from './DepartmentServicesScalarWhereInput.schema';
import { DepartmentServicesUpdateManyMutationInputObjectSchema } from './DepartmentServicesUpdateManyMutationInput.schema';
import { DepartmentServicesUncheckedUpdateManyWithoutDepartmentServicesInputObjectSchema } from './DepartmentServicesUncheckedUpdateManyWithoutDepartmentServicesInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.DepartmentServicesUpdateManyWithWhereWithoutServiceInput> = z
    .object({
        where: z.lazy(() => DepartmentServicesScalarWhereInputObjectSchema),
        data: z.union([
            z.lazy(() => DepartmentServicesUpdateManyMutationInputObjectSchema),
            z.lazy(
                () =>
                    DepartmentServicesUncheckedUpdateManyWithoutDepartmentServicesInputObjectSchema
            ),
        ]),
    })
    .strict();

export const DepartmentServicesUpdateManyWithWhereWithoutServiceInputObjectSchema = Schema;
