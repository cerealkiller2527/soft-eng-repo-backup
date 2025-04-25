import { z } from 'zod';
import { LocationCreateWithoutNodeInputObjectSchema } from './LocationCreateWithoutNodeInput.schema';
import { LocationUncheckedCreateWithoutNodeInputObjectSchema } from './LocationUncheckedCreateWithoutNodeInput.schema';
import { LocationCreateOrConnectWithoutNodeInputObjectSchema } from './LocationCreateOrConnectWithoutNodeInput.schema';
import { LocationUpsertWithWhereUniqueWithoutNodeInputObjectSchema } from './LocationUpsertWithWhereUniqueWithoutNodeInput.schema';
import { LocationCreateManyNodeInputEnvelopeObjectSchema } from './LocationCreateManyNodeInputEnvelope.schema';
import { LocationWhereUniqueInputObjectSchema } from './LocationWhereUniqueInput.schema';
import { LocationUpdateWithWhereUniqueWithoutNodeInputObjectSchema } from './LocationUpdateWithWhereUniqueWithoutNodeInput.schema';
import { LocationUpdateManyWithWhereWithoutNodeInputObjectSchema } from './LocationUpdateManyWithWhereWithoutNodeInput.schema';
import { LocationScalarWhereInputObjectSchema } from './LocationScalarWhereInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.LocationUncheckedUpdateManyWithoutNodeNestedInput> = z
    .object({
        create: z
            .union([
                z.lazy(() => LocationCreateWithoutNodeInputObjectSchema),
                z.lazy(() => LocationCreateWithoutNodeInputObjectSchema).array(),
                z.lazy(() => LocationUncheckedCreateWithoutNodeInputObjectSchema),
                z.lazy(() => LocationUncheckedCreateWithoutNodeInputObjectSchema).array(),
            ])
            .optional(),
        connectOrCreate: z
            .union([
                z.lazy(() => LocationCreateOrConnectWithoutNodeInputObjectSchema),
                z.lazy(() => LocationCreateOrConnectWithoutNodeInputObjectSchema).array(),
            ])
            .optional(),
        upsert: z
            .union([
                z.lazy(() => LocationUpsertWithWhereUniqueWithoutNodeInputObjectSchema),
                z.lazy(() => LocationUpsertWithWhereUniqueWithoutNodeInputObjectSchema).array(),
            ])
            .optional(),
        createMany: z.lazy(() => LocationCreateManyNodeInputEnvelopeObjectSchema).optional(),
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
                z.lazy(() => LocationUpdateWithWhereUniqueWithoutNodeInputObjectSchema),
                z.lazy(() => LocationUpdateWithWhereUniqueWithoutNodeInputObjectSchema).array(),
            ])
            .optional(),
        updateMany: z
            .union([
                z.lazy(() => LocationUpdateManyWithWhereWithoutNodeInputObjectSchema),
                z.lazy(() => LocationUpdateManyWithWhereWithoutNodeInputObjectSchema).array(),
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

export const LocationUncheckedUpdateManyWithoutNodeNestedInputObjectSchema = Schema;
