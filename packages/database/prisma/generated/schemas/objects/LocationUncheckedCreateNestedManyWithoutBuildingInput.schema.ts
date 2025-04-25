import { z } from 'zod';
import { LocationCreateWithoutBuildingInputObjectSchema } from './LocationCreateWithoutBuildingInput.schema';
import { LocationUncheckedCreateWithoutBuildingInputObjectSchema } from './LocationUncheckedCreateWithoutBuildingInput.schema';
import { LocationCreateOrConnectWithoutBuildingInputObjectSchema } from './LocationCreateOrConnectWithoutBuildingInput.schema';
import { LocationCreateManyBuildingInputEnvelopeObjectSchema } from './LocationCreateManyBuildingInputEnvelope.schema';
import { LocationWhereUniqueInputObjectSchema } from './LocationWhereUniqueInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.LocationUncheckedCreateNestedManyWithoutBuildingInput> = z
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
        createMany: z.lazy(() => LocationCreateManyBuildingInputEnvelopeObjectSchema).optional(),
        connect: z
            .union([
                z.lazy(() => LocationWhereUniqueInputObjectSchema),
                z.lazy(() => LocationWhereUniqueInputObjectSchema).array(),
            ])
            .optional(),
    })
    .strict();

export const LocationUncheckedCreateNestedManyWithoutBuildingInputObjectSchema = Schema;
