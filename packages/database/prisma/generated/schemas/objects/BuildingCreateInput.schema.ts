import { z } from 'zod';
import { LocationCreateNestedManyWithoutBuildingInputObjectSchema } from './LocationCreateNestedManyWithoutBuildingInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.BuildingCreateInput> = z
    .object({
        id: z.number(),
        name: z.string(),
        address: z.string(),
        phoneNumber: z.string(),
        Location: z.lazy(() => LocationCreateNestedManyWithoutBuildingInputObjectSchema).optional(),
    })
    .strict();

export const BuildingCreateInputObjectSchema = Schema;
