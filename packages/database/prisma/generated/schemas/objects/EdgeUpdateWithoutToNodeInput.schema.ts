import { z } from 'zod';
import { NodeUpdateOneRequiredWithoutFromEdgeNestedInputObjectSchema } from './NodeUpdateOneRequiredWithoutFromEdgeNestedInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.EdgeUpdateWithoutToNodeInput> = z
    .object({
        fromNode: z
            .lazy(() => NodeUpdateOneRequiredWithoutFromEdgeNestedInputObjectSchema)
            .optional(),
    })
    .strict();

export const EdgeUpdateWithoutToNodeInputObjectSchema = Schema;
