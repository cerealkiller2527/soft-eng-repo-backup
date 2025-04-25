import { z } from 'zod';
import { DepartmentCreateWithoutLocationInputObjectSchema } from './DepartmentCreateWithoutLocationInput.schema';
import { DepartmentUncheckedCreateWithoutLocationInputObjectSchema } from './DepartmentUncheckedCreateWithoutLocationInput.schema';
import { DepartmentCreateOrConnectWithoutLocationInputObjectSchema } from './DepartmentCreateOrConnectWithoutLocationInput.schema';
import { DepartmentUpsertWithoutLocationInputObjectSchema } from './DepartmentUpsertWithoutLocationInput.schema';
import { DepartmentWhereUniqueInputObjectSchema } from './DepartmentWhereUniqueInput.schema';
import { DepartmentUpdateWithoutLocationInputObjectSchema } from './DepartmentUpdateWithoutLocationInput.schema';
import { DepartmentUncheckedUpdateWithoutLocationInputObjectSchema } from './DepartmentUncheckedUpdateWithoutLocationInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.DepartmentUpdateOneWithoutLocationNestedInput> = z
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
        upsert: z.lazy(() => DepartmentUpsertWithoutLocationInputObjectSchema).optional(),
        disconnect: z.boolean().optional(),
        delete: z.boolean().optional(),
        connect: z.lazy(() => DepartmentWhereUniqueInputObjectSchema).optional(),
        update: z
            .union([
                z.lazy(() => DepartmentUpdateWithoutLocationInputObjectSchema),
                z.lazy(() => DepartmentUncheckedUpdateWithoutLocationInputObjectSchema),
            ])
            .optional(),
    })
    .strict();

export const DepartmentUpdateOneWithoutLocationNestedInputObjectSchema = Schema;
