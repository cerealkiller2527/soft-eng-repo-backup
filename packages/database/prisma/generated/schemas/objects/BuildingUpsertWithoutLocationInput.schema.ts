import { z } from 'zod';
import { BuildingUpdateWithoutLocationInputObjectSchema } from './BuildingUpdateWithoutLocationInput.schema';
import { BuildingUncheckedUpdateWithoutLocationInputObjectSchema } from './BuildingUncheckedUpdateWithoutLocationInput.schema';
import { BuildingCreateWithoutLocationInputObjectSchema } from './BuildingCreateWithoutLocationInput.schema';
import { BuildingUncheckedCreateWithoutLocationInputObjectSchema } from './BuildingUncheckedCreateWithoutLocationInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.BuildingUpsertWithoutLocationInput> = z
    .object({
        update: z.union([
            z.lazy(() => BuildingUpdateWithoutLocationInputObjectSchema),
            z.lazy(() => BuildingUncheckedUpdateWithoutLocationInputObjectSchema),
        ]),
        create: z.union([
            z.lazy(() => BuildingCreateWithoutLocationInputObjectSchema),
            z.lazy(() => BuildingUncheckedCreateWithoutLocationInputObjectSchema),
        ]),
    })
    .strict();

export const BuildingUpsertWithoutLocationInputObjectSchema = Schema;
