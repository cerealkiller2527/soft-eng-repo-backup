import { z } from 'zod';
import { LocationUncheckedCreateNestedManyWithoutBuildingInputObjectSchema } from './LocationUncheckedCreateNestedManyWithoutBuildingInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.BuildingUncheckedCreateInput> = z
    .object({
        id: z.number(),
        name: z.string(),
        address: z.string(),
        phoneNumber: z.string(),
        Location: z
            .lazy(() => LocationUncheckedCreateNestedManyWithoutBuildingInputObjectSchema)
            .optional(),
    })
    .strict();

export const BuildingUncheckedCreateInputObjectSchema = Schema;
