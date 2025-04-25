import { z } from 'zod';
import { LocationCreateWithoutDepartmentInputObjectSchema } from './LocationCreateWithoutDepartmentInput.schema';
import { LocationUncheckedCreateWithoutDepartmentInputObjectSchema } from './LocationUncheckedCreateWithoutDepartmentInput.schema';
import { LocationCreateOrConnectWithoutDepartmentInputObjectSchema } from './LocationCreateOrConnectWithoutDepartmentInput.schema';
import { LocationUpsertWithWhereUniqueWithoutDepartmentInputObjectSchema } from './LocationUpsertWithWhereUniqueWithoutDepartmentInput.schema';
import { LocationCreateManyDepartmentInputEnvelopeObjectSchema } from './LocationCreateManyDepartmentInputEnvelope.schema';
import { LocationWhereUniqueInputObjectSchema } from './LocationWhereUniqueInput.schema';
import { LocationUpdateWithWhereUniqueWithoutDepartmentInputObjectSchema } from './LocationUpdateWithWhereUniqueWithoutDepartmentInput.schema';
import { LocationUpdateManyWithWhereWithoutDepartmentInputObjectSchema } from './LocationUpdateManyWithWhereWithoutDepartmentInput.schema';
import { LocationScalarWhereInputObjectSchema } from './LocationScalarWhereInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.LocationUncheckedUpdateManyWithoutDepartmentNestedInput> = z
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
        upsert: z
            .union([
                z.lazy(() => LocationUpsertWithWhereUniqueWithoutDepartmentInputObjectSchema),
                z
                    .lazy(() => LocationUpsertWithWhereUniqueWithoutDepartmentInputObjectSchema)
                    .array(),
            ])
            .optional(),
        createMany: z.lazy(() => LocationCreateManyDepartmentInputEnvelopeObjectSchema).optional(),
        set: z
            .union([
                z.lazy(() => LocationWhereUniqueInputObjectSchema),
                z.lazy(() => LocationWhereUniqueInputObjectSchema).array(),
            ])
            .optional(),
        disconnect: z
            .union([
                z.lazy(() => LocationWhereUniqueInputObjectSchema),
                z.lazy(() => LocationWhereUniqueInputObjectSchema).array(),
            ])
            .optional(),
        delete: z
            .union([
                z.lazy(() => LocationWhereUniqueInputObjectSchema),
                z.lazy(() => LocationWhereUniqueInputObjectSchema).array(),
            ])
            .optional(),
        connect: z
            .union([
                z.lazy(() => LocationWhereUniqueInputObjectSchema),
                z.lazy(() => LocationWhereUniqueInputObjectSchema).array(),
            ])
            .optional(),
        update: z
            .union([
                z.lazy(() => LocationUpdateWithWhereUniqueWithoutDepartmentInputObjectSchema),
                z
                    .lazy(() => LocationUpdateWithWhereUniqueWithoutDepartmentInputObjectSchema)
                    .array(),
            ])
            .optional(),
        updateMany: z
            .union([
                z.lazy(() => LocationUpdateManyWithWhereWithoutDepartmentInputObjectSchema),
                z.lazy(() => LocationUpdateManyWithWhereWithoutDepartmentInputObjectSchema).array(),
            ])
            .optional(),
        deleteMany: z
            .union([
                z.lazy(() => LocationScalarWhereInputObjectSchema),
                z.lazy(() => LocationScalarWhereInputObjectSchema).array(),
            ])
            .optional(),
    })
    .strict();

export const LocationUncheckedUpdateManyWithoutDepartmentNestedInputObjectSchema = Schema;
