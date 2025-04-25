import { z } from 'zod';
import { IntWithAggregatesFilterObjectSchema } from './IntWithAggregatesFilter.schema';
import { StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.ExternalTransportationScalarWhereWithAggregatesInput> = z
    .object({
        AND: z
            .union([
                z.lazy(() => ExternalTransportationScalarWhereWithAggregatesInputObjectSchema),
                z
                    .lazy(() => ExternalTransportationScalarWhereWithAggregatesInputObjectSchema)
                    .array(),
            ])
            .optional(),
        OR: z
            .lazy(() => ExternalTransportationScalarWhereWithAggregatesInputObjectSchema)
            .array()
            .optional(),
        NOT: z
            .union([
                z.lazy(() => ExternalTransportationScalarWhereWithAggregatesInputObjectSchema),
                z
                    .lazy(() => ExternalTransportationScalarWhereWithAggregatesInputObjectSchema)
                    .array(),
            ])
            .optional(),
        id: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number()]).optional(),
        fromWhere: z
            .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
            .optional(),
        toWhere: z
            .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
            .optional(),
        transportType: z
            .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
            .optional(),
        patientName: z
            .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
            .optional(),
        pickupTime: z
            .union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()])
            .optional(),
    })
    .strict();

export const ExternalTransportationScalarWhereWithAggregatesInputObjectSchema = Schema;
