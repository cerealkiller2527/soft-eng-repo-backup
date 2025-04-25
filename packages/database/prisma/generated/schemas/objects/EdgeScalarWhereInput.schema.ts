import { z } from 'zod';
import { IntFilterObjectSchema } from './IntFilter.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.EdgeScalarWhereInput> = z
    .object({
        AND: z
            .union([
                z.lazy(() => EdgeScalarWhereInputObjectSchema),
                z.lazy(() => EdgeScalarWhereInputObjectSchema).array(),
            ])
            .optional(),
        OR: z
            .lazy(() => EdgeScalarWhereInputObjectSchema)
            .array()
            .optional(),
        NOT: z
            .union([
                z.lazy(() => EdgeScalarWhereInputObjectSchema),
                z.lazy(() => EdgeScalarWhereInputObjectSchema).array(),
            ])
            .optional(),
        id: z.union([z.lazy(() => IntFilterObjectSchema), z.number()]).optional(),
        fromNodeId: z.union([z.lazy(() => IntFilterObjectSchema), z.number()]).optional(),
        toNodeId: z.union([z.lazy(() => IntFilterObjectSchema), z.number()]).optional(),
    })
    .strict();

export const EdgeScalarWhereInputObjectSchema = Schema;
