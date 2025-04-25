import { z } from 'zod';
import { LocationWhereUniqueInputObjectSchema } from './LocationWhereUniqueInput.schema';
import { LocationUpdateWithoutDepartmentInputObjectSchema } from './LocationUpdateWithoutDepartmentInput.schema';
import { LocationUncheckedUpdateWithoutDepartmentInputObjectSchema } from './LocationUncheckedUpdateWithoutDepartmentInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.LocationUpdateWithWhereUniqueWithoutDepartmentInput> = z
    .object({
        where: z.lazy(() => LocationWhereUniqueInputObjectSchema),
        data: z.union([
            z.lazy(() => LocationUpdateWithoutDepartmentInputObjectSchema),
            z.lazy(() => LocationUncheckedUpdateWithoutDepartmentInputObjectSchema),
        ]),
    })
    .strict();

export const LocationUpdateWithWhereUniqueWithoutDepartmentInputObjectSchema = Schema;
