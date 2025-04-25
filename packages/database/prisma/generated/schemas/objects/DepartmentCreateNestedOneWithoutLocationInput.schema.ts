import { z } from 'zod';
import { DepartmentCreateWithoutLocationInputObjectSchema } from './DepartmentCreateWithoutLocationInput.schema';
import { DepartmentUncheckedCreateWithoutLocationInputObjectSchema } from './DepartmentUncheckedCreateWithoutLocationInput.schema';
import { DepartmentCreateOrConnectWithoutLocationInputObjectSchema } from './DepartmentCreateOrConnectWithoutLocationInput.schema';
import { DepartmentWhereUniqueInputObjectSchema } from './DepartmentWhereUniqueInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.DepartmentCreateNestedOneWithoutLocationInput> = z
    .object({
        create: z
            .union([
                z.lazy(() => DepartmentCreateWithoutLocationInputObjectSchema),
                z.lazy(() => DepartmentUncheckedCreateWithoutLocationInputObjectSchema),
            ])
            .optional(),
        connectOrCreate: z
            .lazy(() => DepartmentCreateOrConnectWithoutLocationInputObjectSchema)
            .optional(),
        connect: z.lazy(() => DepartmentWhereUniqueInputObjectSchema).optional(),
    })
    .strict();

export const DepartmentCreateNestedOneWithoutLocationInputObjectSchema = Schema;
