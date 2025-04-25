import { z } from 'zod';
import { NodeCreateNestedOneWithoutFromEdgeInputObjectSchema } from './NodeCreateNestedOneWithoutFromEdgeInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.EdgeCreateWithoutToNodeInput> = z
    .object({
        fromNode: z.lazy(() => NodeCreateNestedOneWithoutFromEdgeInputObjectSchema),
    })
    .strict();

export const EdgeCreateWithoutToNodeInputObjectSchema = Schema;
