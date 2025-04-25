import { z } from 'zod';
import { NodeWhereUniqueInputObjectSchema } from './NodeWhereUniqueInput.schema';
import { NodeCreateWithoutToEdgeInputObjectSchema } from './NodeCreateWithoutToEdgeInput.schema';
import { NodeUncheckedCreateWithoutToEdgeInputObjectSchema } from './NodeUncheckedCreateWithoutToEdgeInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.NodeCreateOrConnectWithoutToEdgeInput> = z
    .object({
        where: z.lazy(() => NodeWhereUniqueInputObjectSchema),
        create: z.union([
            z.lazy(() => NodeCreateWithoutToEdgeInputObjectSchema),
            z.lazy(() => NodeUncheckedCreateWithoutToEdgeInputObjectSchema),
        ]),
    })
    .strict();

export const NodeCreateOrConnectWithoutToEdgeInputObjectSchema = Schema;
