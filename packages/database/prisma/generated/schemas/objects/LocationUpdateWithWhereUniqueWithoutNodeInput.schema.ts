import { z } from 'zod';
import { LocationWhereUniqueInputObjectSchema } from './LocationWhereUniqueInput.schema';
import { LocationUpdateWithoutNodeInputObjectSchema } from './LocationUpdateWithoutNodeInput.schema';
import { LocationUncheckedUpdateWithoutNodeInputObjectSchema } from './LocationUncheckedUpdateWithoutNodeInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.LocationUpdateWithWhereUniqueWithoutNodeInput> = z
    .object({
        where: z.lazy(() => LocationWhereUniqueInputObjectSchema),
        data: z.union([
            z.lazy(() => LocationUpdateWithoutNodeInputObjectSchema),
            z.lazy(() => LocationUncheckedUpdateWithoutNodeInputObjectSchema),
        ]),
    })
    .strict();

export const LocationUpdateWithWhereUniqueWithoutNodeInputObjectSchema = Schema;
