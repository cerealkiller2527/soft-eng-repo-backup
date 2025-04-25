import { z } from 'zod';
import { IntFilterObjectSchema } from './IntFilter.schema';
import { EnumnodeTypeFilterObjectSchema } from './EnumnodeTypeFilter.schema';
import { nodeTypeSchema } from '../enums/nodeType.schema';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { FloatFilterObjectSchema } from './FloatFilter.schema';
import { EdgeListRelationFilterObjectSchema } from './EdgeListRelationFilter.schema';
import { LocationListRelationFilterObjectSchema } from './LocationListRelationFilter.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.NodeWhereInput> = z
    .object({
        AND: z
            .union([
                z.lazy(() => NodeWhereInputObjectSchema),
                z.lazy(() => NodeWhereInputObjectSchema).array(),
            ])
            .optional(),
        OR: z
            .lazy(() => NodeWhereInputObjectSchema)
            .array()
            .optional(),
        NOT: z
            .union([
                z.lazy(() => NodeWhereInputObjectSchema),
                z.lazy(() => NodeWhereInputObjectSchema).array(),
            ])
            .optional(),
        id: z.union([z.lazy(() => IntFilterObjectSchema), z.number()]).optional(),
        type: z
            .union([z.lazy(() => EnumnodeTypeFilterObjectSchema), z.lazy(() => nodeTypeSchema)])
            .optional(),
        description: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
        lat: z.union([z.lazy(() => FloatFilterObjectSchema), z.number()]).optional(),
        long: z.union([z.lazy(() => FloatFilterObjectSchema), z.number()]).optional(),
        fromEdge: z.lazy(() => EdgeListRelationFilterObjectSchema).optional(),
        toEdge: z.lazy(() => EdgeListRelationFilterObjectSchema).optional(),
        Location: z.lazy(() => LocationListRelationFilterObjectSchema).optional(),
    })
    .strict();

export const NodeWhereInputObjectSchema = Schema;
