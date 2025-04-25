import { z } from 'zod';
import { IntFilterObjectSchema } from './IntFilter.schema';
import { NodeRelationFilterObjectSchema } from './NodeRelationFilter.schema';
import { NodeWhereInputObjectSchema } from './NodeWhereInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.EdgeWhereInput> = z
    .object({
        AND: z
            .union([
                z.lazy(() => EdgeWhereInputObjectSchema),
                z.lazy(() => EdgeWhereInputObjectSchema).array(),
            ])
            .optional(),
        OR: z
            .lazy(() => EdgeWhereInputObjectSchema)
            .array()
            .optional(),
        NOT: z
            .union([
                z.lazy(() => EdgeWhereInputObjectSchema),
                z.lazy(() => EdgeWhereInputObjectSchema).array(),
            ])
            .optional(),
        id: z.union([z.lazy(() => IntFilterObjectSchema), z.number()]).optional(),
        fromNodeId: z.union([z.lazy(() => IntFilterObjectSchema), z.number()]).optional(),
        toNodeId: z.union([z.lazy(() => IntFilterObjectSchema), z.number()]).optional(),
        fromNode: z
            .union([
                z.lazy(() => NodeRelationFilterObjectSchema),
                z.lazy(() => NodeWhereInputObjectSchema),
            ])
            .optional(),
        toNode: z
            .union([
                z.lazy(() => NodeRelationFilterObjectSchema),
                z.lazy(() => NodeWhereInputObjectSchema),
            ])
            .optional(),
    })
    .strict();

export const EdgeWhereInputObjectSchema = Schema;
