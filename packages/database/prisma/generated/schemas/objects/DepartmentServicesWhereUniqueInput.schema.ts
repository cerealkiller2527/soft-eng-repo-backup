import { z } from 'zod';
import { DepartmentServicesDepartmentIDServiceIDCompoundUniqueInputObjectSchema } from './DepartmentServicesDepartmentIDServiceIDCompoundUniqueInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.DepartmentServicesWhereUniqueInput> = z
    .object({
        departmentID_serviceID: z
            .lazy(() => DepartmentServicesDepartmentIDServiceIDCompoundUniqueInputObjectSchema)
            .optional(),
    })
    .strict();

export const DepartmentServicesWhereUniqueInputObjectSchema = Schema;
