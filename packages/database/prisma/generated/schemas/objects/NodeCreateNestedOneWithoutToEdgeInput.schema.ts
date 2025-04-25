import { z } from 'zod';
import { NodeCreateWithoutToEdgeInputObjectSchema } from './NodeCreateWithoutToEdgeInput.schema';
import { NodeUncheckedCreateWithoutToEdgeInputObjectSchema } from './NodeUncheckedCreateWithoutToEdgeInput.schema';
import { NodeCreateOrConnectWithoutToEdgeInputObjectSchema } from './NodeCreateOrConnectWithoutToEdgeInput.schema';
import { NodeWhereUniqueInputObjectSchema } from './NodeWhereUniqueInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.NodeCreateNestedOneWithoutToEdgeInput> = z
    .object({
        create: z
            .union([
                z.lazy(() => NodeCreateWithoutToEdgeInputObjectSchema),
                z.lazy(() => NodeUncheckedCreateWithoutToEdgeInputObjectSchema),
            ])
            .optional(),
        connectOrCreate: z.lazy(() => NodeCreateOrConnectWithoutToEdgeInputObjectSchema).optional(),
        connect: z.lazy(() => NodeWhereUniqueInputObjectSchema).optional(),
    })
    .strict();

export const NodeCreateNestedOneWithoutToEdgeInputObjectSchema = Schema;
