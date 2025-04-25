import { z } from 'zod';
import { nodeTypeSchema } from '../enums/nodeType.schema';
import { EdgeUncheckedCreateNestedManyWithoutToNodeInputObjectSchema } from './EdgeUncheckedCreateNestedManyWithoutToNodeInput.schema';
import { LocationUncheckedCreateNestedManyWithoutNodeInputObjectSchema } from './LocationUncheckedCreateNestedManyWithoutNodeInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.NodeUncheckedCreateWithoutFromEdgeInput> = z
    .object({
        id: z.number().optional(),
        type: z.lazy(() => nodeTypeSchema),
        description: z.string(),
        lat: z.number(),
        long: z.number(),
        toEdge: z
            .lazy(() => EdgeUncheckedCreateNestedManyWithoutToNodeInputObjectSchema)
            .optional(),
        Location: z
            .lazy(() => LocationUncheckedCreateNestedManyWithoutNodeInputObjectSchema)
            .optional(),
    })
    .strict();

export const NodeUncheckedCreateWithoutFromEdgeInputObjectSchema = Schema;
