import { z } from 'zod';
import { LocationCreateWithoutBuildingInputObjectSchema } from './LocationCreateWithoutBuildingInput.schema';
import { LocationUncheckedCreateWithoutBuildingInputObjectSchema } from './LocationUncheckedCreateWithoutBuildingInput.schema';
import { LocationCreateOrConnectWithoutBuildingInputObjectSchema } from './LocationCreateOrConnectWithoutBuildingInput.schema';
import { LocationUpsertWithWhereUniqueWithoutBuildingInputObjectSchema } from './LocationUpsertWithWhereUniqueWithoutBuildingInput.schema';
import { LocationCreateManyBuildingInputEnvelopeObjectSchema } from './LocationCreateManyBuildingInputEnvelope.schema';
import { LocationWhereUniqueInputObjectSchema } from './LocationWhereUniqueInput.schema';
import { LocationUpdateWithWhereUniqueWithoutBuildingInputObjectSchema } from './LocationUpdateWithWhereUniqueWithoutBuildingInput.schema';
import { LocationUpdateManyWithWhereWithoutBuildingInputObjectSchema } from './LocationUpdateManyWithWhereWithoutBuildingInput.schema';
import { LocationScalarWhereInputObjectSchema } from './LocationScalarWhereInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.LocationUpdateManyWithoutBuildingNestedInput> = z
    .object({
        create: z
            .union([
                z.lazy(() => LocationCreateWithoutBuildingInputObjectSchema),
                z.lazy(() => LocationCreateWithoutBuildingInputObjectSchema).array(),
                z.lazy(() => LocationUncheckedCreateWithoutBuildingInputObjectSchema),
                z.lazy(() => LocationUncheckedCreateWithoutBuildingInputObjectSchema).array(),
            ])
            .optional(),
        connectOrCreate: z
            .union([
                z.lazy(() => LocationCreateOrConnectWithoutBuildingInputObjectSchema),
                z.lazy(() => LocationCreateOrConnectWithoutBuildingInputObjectSchema).array(),
            ])
            .optional(),
        upsert: z
            .union([
                z.lazy(() => LocationUpsertWithWhereUniqueWithoutBuildingInputObjectSchema),
                z.lazy(() => LocationUpsertWithWhereUniqueWithoutBuildingInputObjectSchema).array(),
            ])
            .optional(),
        createMany: z.lazy(() => LocationCreateManyBuildingInputEnvelopeObjectSchema).optional(),
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
                z.lazy(() => LocationUpdateWithWhereUniqueWithoutBuildingInputObjectSchema),
                z.lazy(() => LocationUpdateWithWhereUniqueWithoutBuildingInputObjectSchema).array(),
            ])
            .optional(),
        updateMany: z
            .union([
                z.lazy(() => LocationUpdateManyWithWhereWithoutBuildingInputObjectSchema),
                z.lazy(() => LocationUpdateManyWithWhereWithoutBuildingInputObjectSchema).array(),
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

export const LocationUpdateManyWithoutBuildingNestedInputObjectSchema = Schema;
