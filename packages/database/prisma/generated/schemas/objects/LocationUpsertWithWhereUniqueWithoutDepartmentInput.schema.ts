import { z } from 'zod';
import { LocationWhereUniqueInputObjectSchema } from './LocationWhereUniqueInput.schema';
import { LocationUpdateWithoutDepartmentInputObjectSchema } from './LocationUpdateWithoutDepartmentInput.schema';
import { LocationUncheckedUpdateWithoutDepartmentInputObjectSchema } from './LocationUncheckedUpdateWithoutDepartmentInput.schema';
import { LocationCreateWithoutDepartmentInputObjectSchema } from './LocationCreateWithoutDepartmentInput.schema';
import { LocationUncheckedCreateWithoutDepartmentInputObjectSchema } from './LocationUncheckedCreateWithoutDepartmentInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.LocationUpsertWithWhereUniqueWithoutDepartmentInput> = z
    .object({
        where: z.lazy(() => LocationWhereUniqueInputObjectSchema),
        update: z.union([
            z.lazy(() => LocationUpdateWithoutDepartmentInputObjectSchema),
            z.lazy(() => LocationUncheckedUpdateWithoutDepartmentInputObjectSchema),
        ]),
        create: z.union([
            z.lazy(() => LocationCreateWithoutDepartmentInputObjectSchema),
            z.lazy(() => LocationUncheckedCreateWithoutDepartmentInputObjectSchema),
        ]),
    })
    .strict();

export const LocationUpsertWithWhereUniqueWithoutDepartmentInputObjectSchema = Schema;
