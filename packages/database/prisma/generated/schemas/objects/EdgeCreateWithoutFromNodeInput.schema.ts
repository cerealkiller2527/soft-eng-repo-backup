import { z } from 'zod';
import { NodeCreateNestedOneWithoutToEdgeInputObjectSchema } from './NodeCreateNestedOneWithoutToEdgeInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.EdgeCreateWithoutFromNodeInput> = z
    .object({
        toNode: z.lazy(() => NodeCreateNestedOneWithoutToEdgeInputObjectSchema),
    })
    .strict();

export const EdgeCreateWithoutFromNodeInputObjectSchema = Schema;
