import { z } from 'zod';
import { IntFilterObjectSchema } from './IntFilter.schema';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { ServiceRequestRelationFilterObjectSchema } from './ServiceRequestRelationFilter.schema';
import { ServiceRequestWhereInputObjectSchema } from './ServiceRequestWhereInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.AudioVisualWhereInput> = z
    .object({
        AND: z
            .union([
                z.lazy(() => AudioVisualWhereInputObjectSchema),
                z.lazy(() => AudioVisualWhereInputObjectSchema).array(),
            ])
            .optional(),
        OR: z
            .lazy(() => AudioVisualWhereInputObjectSchema)
            .array()
            .optional(),
        NOT: z
            .union([
                z.lazy(() => AudioVisualWhereInputObjectSchema),
                z.lazy(() => AudioVisualWhereInputObjectSchema).array(),
            ])
            .optional(),
        id: z.union([z.lazy(() => IntFilterObjectSchema), z.number()]).optional(),
        location: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
        deadline: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
        audiovisualType: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
        serviceRequest: z
            .union([
                z.lazy(() => ServiceRequestRelationFilterObjectSchema),
                z.lazy(() => ServiceRequestWhereInputObjectSchema),
            ])
            .optional(),
    })
    .strict();

export const AudioVisualWhereInputObjectSchema = Schema;
