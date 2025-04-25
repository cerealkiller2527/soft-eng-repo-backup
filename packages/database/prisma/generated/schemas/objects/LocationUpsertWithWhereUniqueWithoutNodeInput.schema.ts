import { z } from 'zod';
import { LocationWhereUniqueInputObjectSchema } from './LocationWhereUniqueInput.schema';
import { LocationUpdateWithoutNodeInputObjectSchema } from './LocationUpdateWithoutNodeInput.schema';
import { LocationUncheckedUpdateWithoutNodeInputObjectSchema } from './LocationUncheckedUpdateWithoutNodeInput.schema';
import { LocationCreateWithoutNodeInputObjectSchema } from './LocationCreateWithoutNodeInput.schema';
import { LocationUncheckedCreateWithoutNodeInputObjectSchema } from './LocationUncheckedCreateWithoutNodeInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.LocationUpsertWithWhereUniqueWithoutNodeInput> = z
    .object({
        where: z.lazy(() => LocationWhereUniqueInputObjectSchema),
        update: z.union([
            z.lazy(() => LocationUpdateWithoutNodeInputObjectSchema),
            z.lazy(() => LocationUncheckedUpdateWithoutNodeInputObjectSchema),
        ]),
        create: z.union([
            z.lazy(() => LocationCreateWithoutNodeInputObjectSchema),
            z.lazy(() => LocationUncheckedCreateWithoutNodeInputObjectSchema),
        ]),
    })
    .strict();

export const LocationUpsertWithWhereUniqueWithoutNodeInputObjectSchema = Schema;
