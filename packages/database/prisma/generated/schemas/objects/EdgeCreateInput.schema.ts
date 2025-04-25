import { z } from 'zod';
import { NodeCreateNestedOneWithoutFromEdgeInputObjectSchema } from './NodeCreateNestedOneWithoutFromEdgeInput.schema';
import { NodeCreateNestedOneWithoutToEdgeInputObjectSchema } from './NodeCreateNestedOneWithoutToEdgeInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.EdgeCreateInput> = z
    .object({
        fromNode: z.lazy(() => NodeCreateNestedOneWithoutFromEdgeInputObjectSchema),
        toNode: z.lazy(() => NodeCreateNestedOneWithoutToEdgeInputObjectSchema),
    })
    .strict();

export const EdgeCreateInputObjectSchema = Schema;
