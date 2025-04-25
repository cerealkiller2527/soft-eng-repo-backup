import { z } from 'zod';
import { LocationWhereUniqueInputObjectSchema } from './LocationWhereUniqueInput.schema';
import { LocationCreateWithoutNodeInputObjectSchema } from './LocationCreateWithoutNodeInput.schema';
import { LocationUncheckedCreateWithoutNodeInputObjectSchema } from './LocationUncheckedCreateWithoutNodeInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.LocationCreateOrConnectWithoutNodeInput> = z
    .object({
        where: z.lazy(() => LocationWhereUniqueInputObjectSchema),
        create: z.union([
            z.lazy(() => LocationCreateWithoutNodeInputObjectSchema),
            z.lazy(() => LocationUncheckedCreateWithoutNodeInputObjectSchema),
        ]),
    })
    .strict();

export const LocationCreateOrConnectWithoutNodeInputObjectSchema = Schema;
