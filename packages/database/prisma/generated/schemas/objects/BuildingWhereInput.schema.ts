import { z } from 'zod';
import { IntFilterObjectSchema } from './IntFilter.schema';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { LocationListRelationFilterObjectSchema } from './LocationListRelationFilter.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.BuildingWhereInput> = z
    .object({
        AND: z
            .union([
                z.lazy(() => BuildingWhereInputObjectSchema),
                z.lazy(() => BuildingWhereInputObjectSchema).array(),
            ])
            .optional(),
        OR: z
            .lazy(() => BuildingWhereInputObjectSchema)
            .array()
            .optional(),
        NOT: z
            .union([
                z.lazy(() => BuildingWhereInputObjectSchema),
                z.lazy(() => BuildingWhereInputObjectSchema).array(),
            ])
            .optional(),
        id: z.union([z.lazy(() => IntFilterObjectSchema), z.number()]).optional(),
        name: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
        address: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
        phoneNumber: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
        Location: z.lazy(() => LocationListRelationFilterObjectSchema).optional(),
    })
    .strict();

export const BuildingWhereInputObjectSchema = Schema;
