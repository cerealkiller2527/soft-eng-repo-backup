import { z } from 'zod';
import { NodeCreateWithoutLocationInputObjectSchema } from './NodeCreateWithoutLocationInput.schema';
import { NodeUncheckedCreateWithoutLocationInputObjectSchema } from './NodeUncheckedCreateWithoutLocationInput.schema';
import { NodeCreateOrConnectWithoutLocationInputObjectSchema } from './NodeCreateOrConnectWithoutLocationInput.schema';
import { NodeUpsertWithoutLocationInputObjectSchema } from './NodeUpsertWithoutLocationInput.schema';
import { NodeWhereUniqueInputObjectSchema } from './NodeWhereUniqueInput.schema';
import { NodeUpdateWithoutLocationInputObjectSchema } from './NodeUpdateWithoutLocationInput.schema';
import { NodeUncheckedUpdateWithoutLocationInputObjectSchema } from './NodeUncheckedUpdateWithoutLocationInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.NodeUpdateOneWithoutLocationNestedInput> = z
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
        upsert: z.lazy(() => NodeUpsertWithoutLocationInputObjectSchema).optional(),
        disconnect: z.boolean().optional(),
        delete: z.boolean().optional(),
        connect: z.lazy(() => NodeWhereUniqueInputObjectSchema).optional(),
        update: z
            .union([
                z.lazy(() => NodeUpdateWithoutLocationInputObjectSchema),
                z.lazy(() => NodeUncheckedUpdateWithoutLocationInputObjectSchema),
            ])
            .optional(),
    })
    .strict();

export const NodeUpdateOneWithoutLocationNestedInputObjectSchema = Schema;
