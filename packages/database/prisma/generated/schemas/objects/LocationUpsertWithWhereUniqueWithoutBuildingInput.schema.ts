import { z } from 'zod';
import { LocationWhereUniqueInputObjectSchema } from './LocationWhereUniqueInput.schema';
import { LocationUpdateWithoutBuildingInputObjectSchema } from './LocationUpdateWithoutBuildingInput.schema';
import { LocationUncheckedUpdateWithoutBuildingInputObjectSchema } from './LocationUncheckedUpdateWithoutBuildingInput.schema';
import { LocationCreateWithoutBuildingInputObjectSchema } from './LocationCreateWithoutBuildingInput.schema';
import { LocationUncheckedCreateWithoutBuildingInputObjectSchema } from './LocationUncheckedCreateWithoutBuildingInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.LocationUpsertWithWhereUniqueWithoutBuildingInput> = z
    .object({
        where: z.lazy(() => LocationWhereUniqueInputObjectSchema),
        update: z.union([
            z.lazy(() => LocationUpdateWithoutBuildingInputObjectSchema),
            z.lazy(() => LocationUncheckedUpdateWithoutBuildingInputObjectSchema),
        ]),
        create: z.union([
            z.lazy(() => LocationCreateWithoutBuildingInputObjectSchema),
            z.lazy(() => LocationUncheckedCreateWithoutBuildingInputObjectSchema),
        ]),
    })
    .strict();

export const LocationUpsertWithWhereUniqueWithoutBuildingInputObjectSchema = Schema;
