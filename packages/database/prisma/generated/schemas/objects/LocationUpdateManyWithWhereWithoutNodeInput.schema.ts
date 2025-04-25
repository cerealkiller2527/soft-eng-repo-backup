import { z } from 'zod';
import { LocationScalarWhereInputObjectSchema } from './LocationScalarWhereInput.schema';
import { LocationUpdateManyMutationInputObjectSchema } from './LocationUpdateManyMutationInput.schema';
import { LocationUncheckedUpdateManyWithoutLocationInputObjectSchema } from './LocationUncheckedUpdateManyWithoutLocationInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.LocationUpdateManyWithWhereWithoutNodeInput> = z
    .object({
        where: z.lazy(() => LocationScalarWhereInputObjectSchema),
        data: z.union([
            z.lazy(() => LocationUpdateManyMutationInputObjectSchema),
            z.lazy(() => LocationUncheckedUpdateManyWithoutLocationInputObjectSchema),
        ]),
    })
    .strict();

export const LocationUpdateManyWithWhereWithoutNodeInputObjectSchema = Schema;
