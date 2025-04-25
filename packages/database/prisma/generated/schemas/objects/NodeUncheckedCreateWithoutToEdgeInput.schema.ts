import { z } from 'zod';
import { nodeTypeSchema } from '../enums/nodeType.schema';
import { EdgeUncheckedCreateNestedManyWithoutFromNodeInputObjectSchema } from './EdgeUncheckedCreateNestedManyWithoutFromNodeInput.schema';
import { LocationUncheckedCreateNestedManyWithoutNodeInputObjectSchema } from './LocationUncheckedCreateNestedManyWithoutNodeInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.NodeUncheckedCreateWithoutToEdgeInput> = z
    .object({
        id: z.number().optional(),
        type: z.lazy(() => nodeTypeSchema),
        description: z.string(),
        lat: z.number(),
        long: z.number(),
        fromEdge: z
            .lazy(() => EdgeUncheckedCreateNestedManyWithoutFromNodeInputObjectSchema)
            .optional(),
        Location: z
            .lazy(() => LocationUncheckedCreateNestedManyWithoutNodeInputObjectSchema)
            .optional(),
    })
    .strict();

export const NodeUncheckedCreateWithoutToEdgeInputObjectSchema = Schema;
