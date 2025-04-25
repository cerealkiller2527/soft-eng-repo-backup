import { z } from 'zod';
import { BuildingCreateWithoutLocationInputObjectSchema } from './BuildingCreateWithoutLocationInput.schema';
import { BuildingUncheckedCreateWithoutLocationInputObjectSchema } from './BuildingUncheckedCreateWithoutLocationInput.schema';
import { BuildingCreateOrConnectWithoutLocationInputObjectSchema } from './BuildingCreateOrConnectWithoutLocationInput.schema';
import { BuildingUpsertWithoutLocationInputObjectSchema } from './BuildingUpsertWithoutLocationInput.schema';
import { BuildingWhereUniqueInputObjectSchema } from './BuildingWhereUniqueInput.schema';
import { BuildingUpdateWithoutLocationInputObjectSchema } from './BuildingUpdateWithoutLocationInput.schema';
import { BuildingUncheckedUpdateWithoutLocationInputObjectSchema } from './BuildingUncheckedUpdateWithoutLocationInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.BuildingUpdateOneRequiredWithoutLocationNestedInput> = z
    .object({
        create: z
            .union([
                z.lazy(() => BuildingCreateWithoutLocationInputObjectSchema),
                z.lazy(() => BuildingUncheckedCreateWithoutLocationInputObjectSchema),
            ])
            .optional(),
        connectOrCreate: z
            .lazy(() => BuildingCreateOrConnectWithoutLocationInputObjectSchema)
            .optional(),
        upsert: z.lazy(() => BuildingUpsertWithoutLocationInputObjectSchema).optional(),
        connect: z.lazy(() => BuildingWhereUniqueInputObjectSchema).optional(),
        update: z
            .union([
                z.lazy(() => BuildingUpdateWithoutLocationInputObjectSchema),
                z.lazy(() => BuildingUncheckedUpdateWithoutLocationInputObjectSchema),
            ])
            .optional(),
    })
    .strict();

export const BuildingUpdateOneRequiredWithoutLocationNestedInputObjectSchema = Schema;
