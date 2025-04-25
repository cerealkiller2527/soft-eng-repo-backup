import { z } from 'zod';
import { DepartmentWhereUniqueInputObjectSchema } from './DepartmentWhereUniqueInput.schema';
import { DepartmentCreateWithoutLocationInputObjectSchema } from './DepartmentCreateWithoutLocationInput.schema';
import { DepartmentUncheckedCreateWithoutLocationInputObjectSchema } from './DepartmentUncheckedCreateWithoutLocationInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.DepartmentCreateOrConnectWithoutLocationInput> = z
    .object({
        where: z.lazy(() => DepartmentWhereUniqueInputObjectSchema),
        create: z.union([
            z.lazy(() => DepartmentCreateWithoutLocationInputObjectSchema),
            z.lazy(() => DepartmentUncheckedCreateWithoutLocationInputObjectSchema),
        ]),
    })
    .strict();

export const DepartmentCreateOrConnectWithoutLocationInputObjectSchema = Schema;
