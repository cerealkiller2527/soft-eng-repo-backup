import { z } from 'zod';
import { LocationWhereUniqueInputObjectSchema } from './LocationWhereUniqueInput.schema';
import { LocationUpdateWithoutBuildingInputObjectSchema } from './LocationUpdateWithoutBuildingInput.schema';
import { LocationUncheckedUpdateWithoutBuildingInputObjectSchema } from './LocationUncheckedUpdateWithoutBuildingInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.LocationUpdateWithWhereUniqueWithoutBuildingInput> = z
    .object({
        where: z.lazy(() => LocationWhereUniqueInputObjectSchema),
        data: z.union([
            z.lazy(() => LocationUpdateWithoutBuildingInputObjectSchema),
            z.lazy(() => LocationUncheckedUpdateWithoutBuildingInputObjectSchema),
        ]),
    })
    .strict();

export const LocationUpdateWithWhereUniqueWithoutBuildingInputObjectSchema = Schema;
