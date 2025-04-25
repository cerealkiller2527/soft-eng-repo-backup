import { z } from 'zod';
import { LocationCreateWithoutNodeInputObjectSchema } from './LocationCreateWithoutNodeInput.schema';
import { LocationUncheckedCreateWithoutNodeInputObjectSchema } from './LocationUncheckedCreateWithoutNodeInput.schema';
import { LocationCreateOrConnectWithoutNodeInputObjectSchema } from './LocationCreateOrConnectWithoutNodeInput.schema';
import { LocationCreateManyNodeInputEnvelopeObjectSchema } from './LocationCreateManyNodeInputEnvelope.schema';
import { LocationWhereUniqueInputObjectSchema } from './LocationWhereUniqueInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.LocationCreateNestedManyWithoutNodeInput> = z
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
        createMany: z.lazy(() => LocationCreateManyNodeInputEnvelopeObjectSchema).optional(),
        connect: z
            .union([
                z.lazy(() => LocationWhereUniqueInputObjectSchema),
                z.lazy(() => LocationWhereUniqueInputObjectSchema).array(),
            ])
            .optional(),
    })
    .strict();

export const LocationCreateNestedManyWithoutNodeInputObjectSchema = Schema;
