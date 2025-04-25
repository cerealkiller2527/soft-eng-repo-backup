import { z } from 'zod';
import { IntFilterObjectSchema } from './IntFilter.schema';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { ServiceRequestRelationFilterObjectSchema } from './ServiceRequestRelationFilter.schema';
import { ServiceRequestWhereInputObjectSchema } from './ServiceRequestWhereInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.LanguageWhereInput> = z
    .object({
        AND: z
            .union([
                z.lazy(() => LanguageWhereInputObjectSchema),
                z.lazy(() => LanguageWhereInputObjectSchema).array(),
            ])
            .optional(),
        OR: z
            .lazy(() => LanguageWhereInputObjectSchema)
            .array()
            .optional(),
        NOT: z
            .union([
                z.lazy(() => LanguageWhereInputObjectSchema),
                z.lazy(() => LanguageWhereInputObjectSchema).array(),
            ])
            .optional(),
        id: z.union([z.lazy(() => IntFilterObjectSchema), z.number()]).optional(),
        location: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
        language: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
        startTime: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
        endTime: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
        serviceRequest: z
            .union([
                z.lazy(() => ServiceRequestRelationFilterObjectSchema),
                z.lazy(() => ServiceRequestWhereInputObjectSchema),
            ])
            .optional(),
    })
    .strict();

export const LanguageWhereInputObjectSchema = Schema;
