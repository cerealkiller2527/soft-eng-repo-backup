import { z } from 'zod';
import { IntFilterObjectSchema } from './IntFilter.schema';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { ServiceRequestRelationFilterObjectSchema } from './ServiceRequestRelationFilter.schema';
import { ServiceRequestWhereInputObjectSchema } from './ServiceRequestWhereInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.ExternalTransportationWhereInput> = z
    .object({
        AND: z
            .union([
                z.lazy(() => ExternalTransportationWhereInputObjectSchema),
                z.lazy(() => ExternalTransportationWhereInputObjectSchema).array(),
            ])
            .optional(),
        OR: z
            .lazy(() => ExternalTransportationWhereInputObjectSchema)
            .array()
            .optional(),
        NOT: z
            .union([
                z.lazy(() => ExternalTransportationWhereInputObjectSchema),
                z.lazy(() => ExternalTransportationWhereInputObjectSchema).array(),
            ])
            .optional(),
        id: z.union([z.lazy(() => IntFilterObjectSchema), z.number()]).optional(),
        fromWhere: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
        toWhere: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
        transportType: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
        patientName: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
        pickupTime: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
        serviceRequest: z
            .union([
                z.lazy(() => ServiceRequestRelationFilterObjectSchema),
                z.lazy(() => ServiceRequestWhereInputObjectSchema),
            ])
            .optional(),
    })
    .strict();

export const ExternalTransportationWhereInputObjectSchema = Schema;
