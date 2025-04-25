import { z } from 'zod';
import { NodeCreateWithoutFromEdgeInputObjectSchema } from './NodeCreateWithoutFromEdgeInput.schema';
import { NodeUncheckedCreateWithoutFromEdgeInputObjectSchema } from './NodeUncheckedCreateWithoutFromEdgeInput.schema';
import { NodeCreateOrConnectWithoutFromEdgeInputObjectSchema } from './NodeCreateOrConnectWithoutFromEdgeInput.schema';
import { NodeWhereUniqueInputObjectSchema } from './NodeWhereUniqueInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.NodeCreateNestedOneWithoutFromEdgeInput> = z
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
        connect: z.lazy(() => NodeWhereUniqueInputObjectSchema).optional(),
    })
    .strict();

export const NodeCreateNestedOneWithoutFromEdgeInputObjectSchema = Schema;
