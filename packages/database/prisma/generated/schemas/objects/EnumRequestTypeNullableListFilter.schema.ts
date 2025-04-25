import { z } from 'zod';
import { RequestTypeSchema } from '../enums/RequestType.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.EnumRequestTypeNullableListFilter> = z
    .object({
        equals: z
            .lazy(() => RequestTypeSchema)
            .array()
            .optional()
            .nullable(),
        has: z
            .lazy(() => RequestTypeSchema)
            .optional()
            .nullable(),
        hasEvery: z
            .lazy(() => RequestTypeSchema)
            .array()
            .optional(),
        hasSome: z
            .lazy(() => RequestTypeSchema)
            .array()
            .optional(),
        isEmpty: z.boolean().optional(),
    })
    .strict();

export const EnumRequestTypeNullableListFilterObjectSchema = Schema;
