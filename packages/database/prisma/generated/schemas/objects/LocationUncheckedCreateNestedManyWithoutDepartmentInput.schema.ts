import { z } from 'zod';
import { LocationCreateWithoutDepartmentInputObjectSchema } from './LocationCreateWithoutDepartmentInput.schema';
import { LocationUncheckedCreateWithoutDepartmentInputObjectSchema } from './LocationUncheckedCreateWithoutDepartmentInput.schema';
import { LocationCreateOrConnectWithoutDepartmentInputObjectSchema } from './LocationCreateOrConnectWithoutDepartmentInput.schema';
import { LocationCreateManyDepartmentInputEnvelopeObjectSchema } from './LocationCreateManyDepartmentInputEnvelope.schema';
import { LocationWhereUniqueInputObjectSchema } from './LocationWhereUniqueInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.LocationUncheckedCreateNestedManyWithoutDepartmentInput> = z
    .object({
        create: z
            .union([
                z.lazy(() => LocationCreateWithoutDepartmentInputObjectSchema),
                z.lazy(() => LocationCreateWithoutDepartmentInputObjectSchema).array(),
                z.lazy(() => LocationUncheckedCreateWithoutDepartmentInputObjectSchema),
                z.lazy(() => LocationUncheckedCreateWithoutDepartmentInputObjectSchema).array(),
            ])
            .optional(),
        connectOrCreate: z
            .union([
                z.lazy(() => LocationCreateOrConnectWithoutDepartmentInputObjectSchema),
                z.lazy(() => LocationCreateOrConnectWithoutDepartmentInputObjectSchema).array(),
            ])
            .optional(),
        createMany: z.lazy(() => LocationCreateManyDepartmentInputEnvelopeObjectSchema).optional(),
        connect: z
            .union([
                z.lazy(() => LocationWhereUniqueInputObjectSchema),
                z.lazy(() => LocationWhereUniqueInputObjectSchema).array(),
            ])
            .optional(),
    })
    .strict();

export const LocationUncheckedCreateNestedManyWithoutDepartmentInputObjectSchema = Schema;
