import { z } from 'zod';
import { NodeWhereUniqueInputObjectSchema } from './NodeWhereUniqueInput.schema';
import { NodeCreateWithoutLocationInputObjectSchema } from './NodeCreateWithoutLocationInput.schema';
import { NodeUncheckedCreateWithoutLocationInputObjectSchema } from './NodeUncheckedCreateWithoutLocationInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.NodeCreateOrConnectWithoutLocationInput> = z
    .object({
        where: z.lazy(() => NodeWhereUniqueInputObjectSchema),
        create: z.union([
            z.lazy(() => NodeCreateWithoutLocationInputObjectSchema),
            z.lazy(() => NodeUncheckedCreateWithoutLocationInputObjectSchema),
        ]),
    })
    .strict();

export const NodeCreateOrConnectWithoutLocationInputObjectSchema = Schema;
