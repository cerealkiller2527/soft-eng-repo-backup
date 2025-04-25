import { z } from 'zod';
import { NodeCreateWithoutLocationInputObjectSchema } from './NodeCreateWithoutLocationInput.schema';
import { NodeUncheckedCreateWithoutLocationInputObjectSchema } from './NodeUncheckedCreateWithoutLocationInput.schema';
import { NodeCreateOrConnectWithoutLocationInputObjectSchema } from './NodeCreateOrConnectWithoutLocationInput.schema';
import { NodeWhereUniqueInputObjectSchema } from './NodeWhereUniqueInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.NodeCreateNestedOneWithoutLocationInput> = z
    .object({
        create: z
            .union([
                z.lazy(() => NodeCreateWithoutLocationInputObjectSchema),
                z.lazy(() => NodeUncheckedCreateWithoutLocationInputObjectSchema),
            ])
            .optional(),
        connectOrCreate: z
            .lazy(() => NodeCreateOrConnectWithoutLocationInputObjectSchema)
            .optional(),
        connect: z.lazy(() => NodeWhereUniqueInputObjectSchema).optional(),
    })
    .strict();

export const NodeCreateNestedOneWithoutLocationInputObjectSchema = Schema;
