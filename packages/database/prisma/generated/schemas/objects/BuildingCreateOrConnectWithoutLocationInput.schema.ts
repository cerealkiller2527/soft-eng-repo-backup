import { z } from 'zod';
import { BuildingWhereUniqueInputObjectSchema } from './BuildingWhereUniqueInput.schema';
import { BuildingCreateWithoutLocationInputObjectSchema } from './BuildingCreateWithoutLocationInput.schema';
import { BuildingUncheckedCreateWithoutLocationInputObjectSchema } from './BuildingUncheckedCreateWithoutLocationInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.BuildingCreateOrConnectWithoutLocationInput> = z
    .object({
        where: z.lazy(() => BuildingWhereUniqueInputObjectSchema),
        create: z.union([
            z.lazy(() => BuildingCreateWithoutLocationInputObjectSchema),
            z.lazy(() => BuildingUncheckedCreateWithoutLocationInputObjectSchema),
        ]),
    })
    .strict();

export const BuildingCreateOrConnectWithoutLocationInputObjectSchema = Schema;
