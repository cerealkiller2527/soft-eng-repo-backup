import { z } from 'zod';
import { NodeCreateWithoutToEdgeInputObjectSchema } from './NodeCreateWithoutToEdgeInput.schema';
import { NodeUncheckedCreateWithoutToEdgeInputObjectSchema } from './NodeUncheckedCreateWithoutToEdgeInput.schema';
import { NodeCreateOrConnectWithoutToEdgeInputObjectSchema } from './NodeCreateOrConnectWithoutToEdgeInput.schema';
import { NodeUpsertWithoutToEdgeInputObjectSchema } from './NodeUpsertWithoutToEdgeInput.schema';
import { NodeWhereUniqueInputObjectSchema } from './NodeWhereUniqueInput.schema';
import { NodeUpdateWithoutToEdgeInputObjectSchema } from './NodeUpdateWithoutToEdgeInput.schema';
import { NodeUncheckedUpdateWithoutToEdgeInputObjectSchema } from './NodeUncheckedUpdateWithoutToEdgeInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.NodeUpdateOneRequiredWithoutToEdgeNestedInput> = z
    .object({
        create: z
            .union([
                z.lazy(() => NodeCreateWithoutToEdgeInputObjectSchema),
                z.lazy(() => NodeUncheckedCreateWithoutToEdgeInputObjectSchema),
            ])
            .optional(),
        connectOrCreate: z.lazy(() => NodeCreateOrConnectWithoutToEdgeInputObjectSchema).optional(),
        upsert: z.lazy(() => NodeUpsertWithoutToEdgeInputObjectSchema).optional(),
        connect: z.lazy(() => NodeWhereUniqueInputObjectSchema).optional(),
        update: z
            .union([
                z.lazy(() => NodeUpdateWithoutToEdgeInputObjectSchema),
                z.lazy(() => NodeUncheckedUpdateWithoutToEdgeInputObjectSchema),
            ])
            .optional(),
    })
    .strict();

export const NodeUpdateOneRequiredWithoutToEdgeNestedInputObjectSchema = Schema;
