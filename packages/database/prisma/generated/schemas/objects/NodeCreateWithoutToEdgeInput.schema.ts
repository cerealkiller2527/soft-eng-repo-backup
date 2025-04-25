import { z } from 'zod';
import { nodeTypeSchema } from '../enums/nodeType.schema';
import { EdgeCreateNestedManyWithoutFromNodeInputObjectSchema } from './EdgeCreateNestedManyWithoutFromNodeInput.schema';
import { LocationCreateNestedManyWithoutNodeInputObjectSchema } from './LocationCreateNestedManyWithoutNodeInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.NodeCreateWithoutToEdgeInput> = z
    .object({
        type: z.lazy(() => nodeTypeSchema),
        description: z.string(),
        lat: z.number(),
        long: z.number(),
        fromEdge: z.lazy(() => EdgeCreateNestedManyWithoutFromNodeInputObjectSchema).optional(),
        Location: z.lazy(() => LocationCreateNestedManyWithoutNodeInputObjectSchema).optional(),
    })
    .strict();

export const NodeCreateWithoutToEdgeInputObjectSchema = Schema;
