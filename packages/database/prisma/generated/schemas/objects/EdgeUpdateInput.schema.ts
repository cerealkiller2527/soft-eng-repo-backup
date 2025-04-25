import { z } from 'zod';
import { NodeUpdateOneRequiredWithoutFromEdgeNestedInputObjectSchema } from './NodeUpdateOneRequiredWithoutFromEdgeNestedInput.schema';
import { NodeUpdateOneRequiredWithoutToEdgeNestedInputObjectSchema } from './NodeUpdateOneRequiredWithoutToEdgeNestedInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.EdgeUpdateInput> = z
    .object({
        fromNode: z
            .lazy(() => NodeUpdateOneRequiredWithoutFromEdgeNestedInputObjectSchema)
            .optional(),
        toNode: z.lazy(() => NodeUpdateOneRequiredWithoutToEdgeNestedInputObjectSchema).optional(),
    })
    .strict();

export const EdgeUpdateInputObjectSchema = Schema;
