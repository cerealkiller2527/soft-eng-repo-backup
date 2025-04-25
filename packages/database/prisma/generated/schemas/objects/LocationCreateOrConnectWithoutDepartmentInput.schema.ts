import { z } from 'zod';
import { LocationWhereUniqueInputObjectSchema } from './LocationWhereUniqueInput.schema';
import { LocationCreateWithoutDepartmentInputObjectSchema } from './LocationCreateWithoutDepartmentInput.schema';
import { LocationUncheckedCreateWithoutDepartmentInputObjectSchema } from './LocationUncheckedCreateWithoutDepartmentInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.LocationCreateOrConnectWithoutDepartmentInput> = z
    .object({
        where: z.lazy(() => LocationWhereUniqueInputObjectSchema),
        create: z.union([
            z.lazy(() => LocationCreateWithoutDepartmentInputObjectSchema),
            z.lazy(() => LocationUncheckedCreateWithoutDepartmentInputObjectSchema),
        ]),
    })
    .strict();

export const LocationCreateOrConnectWithoutDepartmentInputObjectSchema = Schema;
