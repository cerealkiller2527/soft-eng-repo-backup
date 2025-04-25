import { z } from 'zod';
import { NodeUpdateWithoutLocationInputObjectSchema } from './NodeUpdateWithoutLocationInput.schema';
import { NodeUncheckedUpdateWithoutLocationInputObjectSchema } from './NodeUncheckedUpdateWithoutLocationInput.schema';
import { NodeCreateWithoutLocationInputObjectSchema } from './NodeCreateWithoutLocationInput.schema';
import { NodeUncheckedCreateWithoutLocationInputObjectSchema } from './NodeUncheckedCreateWithoutLocationInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.NodeUpsertWithoutLocationInput> = z
    .object({
        update: z.union([
            z.lazy(() => NodeUpdateWithoutLocationInputObjectSchema),
            z.lazy(() => NodeUncheckedUpdateWithoutLocationInputObjectSchema),
        ]),
        create: z.union([
            z.lazy(() => NodeCreateWithoutLocationInputObjectSchema),
            z.lazy(() => NodeUncheckedCreateWithoutLocationInputObjectSchema),
        ]),
    })
    .strict();

export const NodeUpsertWithoutLocationInputObjectSchema = Schema;
