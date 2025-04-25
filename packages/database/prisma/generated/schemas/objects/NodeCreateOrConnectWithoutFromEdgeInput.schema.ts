import { z } from 'zod';
import { NodeWhereUniqueInputObjectSchema } from './NodeWhereUniqueInput.schema';
import { NodeCreateWithoutFromEdgeInputObjectSchema } from './NodeCreateWithoutFromEdgeInput.schema';
import { NodeUncheckedCreateWithoutFromEdgeInputObjectSchema } from './NodeUncheckedCreateWithoutFromEdgeInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.NodeCreateOrConnectWithoutFromEdgeInput> = z
    .object({
        where: z.lazy(() => NodeWhereUniqueInputObjectSchema),
        create: z.union([
            z.lazy(() => NodeCreateWithoutFromEdgeInputObjectSchema),
            z.lazy(() => NodeUncheckedCreateWithoutFromEdgeInputObjectSchema),
        ]),
    })
    .strict();

export const NodeCreateOrConnectWithoutFromEdgeInputObjectSchema = Schema;
