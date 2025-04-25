import { z } from 'zod';
import { LocationWhereUniqueInputObjectSchema } from './LocationWhereUniqueInput.schema';
import { LocationCreateWithoutBuildingInputObjectSchema } from './LocationCreateWithoutBuildingInput.schema';
import { LocationUncheckedCreateWithoutBuildingInputObjectSchema } from './LocationUncheckedCreateWithoutBuildingInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.LocationCreateOrConnectWithoutBuildingInput> = z
    .object({
        where: z.lazy(() => LocationWhereUniqueInputObjectSchema),
        create: z.union([
            z.lazy(() => LocationCreateWithoutBuildingInputObjectSchema),
            z.lazy(() => LocationUncheckedCreateWithoutBuildingInputObjectSchema),
        ]),
    })
    .strict();

export const LocationCreateOrConnectWithoutBuildingInputObjectSchema = Schema;
