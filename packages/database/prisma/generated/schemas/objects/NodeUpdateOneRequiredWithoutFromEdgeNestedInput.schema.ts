import { z } from 'zod';
import { NodeCreateWithoutFromEdgeInputObjectSchema } from './NodeCreateWithoutFromEdgeInput.schema';
import { NodeUncheckedCreateWithoutFromEdgeInputObjectSchema } from './NodeUncheckedCreateWithoutFromEdgeInput.schema';
import { NodeCreateOrConnectWithoutFromEdgeInputObjectSchema } from './NodeCreateOrConnectWithoutFromEdgeInput.schema';
import { NodeUpsertWithoutFromEdgeInputObjectSchema } from './NodeUpsertWithoutFromEdgeInput.schema';
import { NodeWhereUniqueInputObjectSchema } from './NodeWhereUniqueInput.schema';
import { NodeUpdateWithoutFromEdgeInputObjectSchema } from './NodeUpdateWithoutFromEdgeInput.schema';
import { NodeUncheckedUpdateWithoutFromEdgeInputObjectSchema } from './NodeUncheckedUpdateWithoutFromEdgeInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.NodeUpdateOneRequiredWithoutFromEdgeNestedInput> = z
    .object({
        create: z
            .union([
                z.lazy(() => NodeCreateWithoutFromEdgeInputObjectSchema),
                z.lazy(() => NodeUncheckedCreateWithoutFromEdgeInputObjectSchema),
            ])
            .optional(),
        connectOrCreate: z
            .lazy(() => NodeCreateOrConnectWithoutFromEdgeInputObjectSchema)
            .optional(),
        upsert: z.lazy(() => NodeUpsertWithoutFromEdgeInputObjectSchema).optional(),
        connect: z.lazy(() => NodeWhereUniqueInputObjectSchema).optional(),
        update: z
            .union([
                z.lazy(() => NodeUpdateWithoutFromEdgeInputObjectSchema),
                z.lazy(() => NodeUncheckedUpdateWithoutFromEdgeInputObjectSchema),
            ])
            .optional(),
    })
    .strict();

export const NodeUpdateOneRequiredWithoutFromEdgeNestedInputObjectSchema = Schema;
