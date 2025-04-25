import { z } from 'zod';
import { NodeUpdateOneRequiredWithoutToEdgeNestedInputObjectSchema } from './NodeUpdateOneRequiredWithoutToEdgeNestedInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.EdgeUpdateWithoutFromNodeInput> = z
    .object({
        toNode: z.lazy(() => NodeUpdateOneRequiredWithoutToEdgeNestedInputObjectSchema).optional(),
    })
    .strict();

export const EdgeUpdateWithoutFromNodeInputObjectSchema = Schema;
