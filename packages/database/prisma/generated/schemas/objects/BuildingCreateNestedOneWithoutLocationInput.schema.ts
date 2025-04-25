import { z } from 'zod';
import { BuildingCreateWithoutLocationInputObjectSchema } from './BuildingCreateWithoutLocationInput.schema';
import { BuildingUncheckedCreateWithoutLocationInputObjectSchema } from './BuildingUncheckedCreateWithoutLocationInput.schema';
import { BuildingCreateOrConnectWithoutLocationInputObjectSchema } from './BuildingCreateOrConnectWithoutLocationInput.schema';
import { BuildingWhereUniqueInputObjectSchema } from './BuildingWhereUniqueInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.BuildingCreateNestedOneWithoutLocationInput> = z
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
        connect: z.lazy(() => BuildingWhereUniqueInputObjectSchema).optional(),
    })
    .strict();

export const BuildingCreateNestedOneWithoutLocationInputObjectSchema = Schema;
