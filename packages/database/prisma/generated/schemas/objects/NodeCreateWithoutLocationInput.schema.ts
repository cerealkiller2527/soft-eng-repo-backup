import { z } from 'zod';
import { nodeTypeSchema } from '../enums/nodeType.schema';
import { EdgeCreateNestedManyWithoutFromNodeInputObjectSchema } from './EdgeCreateNestedManyWithoutFromNodeInput.schema';
import { EdgeCreateNestedManyWithoutToNodeInputObjectSchema } from './EdgeCreateNestedManyWithoutToNodeInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.NodeCreateWithoutLocationInput> = z
    .object({
        type: z.lazy(() => nodeTypeSchema),
        description: z.string(),
        lat: z.number(),
        long: z.number(),
        fromEdge: z.lazy(() => EdgeCreateNestedManyWithoutFromNodeInputObjectSchema).optional(),
        toEdge: z.lazy(() => EdgeCreateNestedManyWithoutToNodeInputObjectSchema).optional(),
    })
    .strict();

export const NodeCreateWithoutLocationInputObjectSchema = Schema;
