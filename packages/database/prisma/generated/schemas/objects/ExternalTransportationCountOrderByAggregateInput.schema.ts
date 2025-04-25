import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.ExternalTransportationCountOrderByAggregateInput> = z
    .object({
        id: z.lazy(() => SortOrderSchema).optional(),
        fromWhere: z.lazy(() => SortOrderSchema).optional(),
        toWhere: z.lazy(() => SortOrderSchema).optional(),
        transportType: z.lazy(() => SortOrderSchema).optional(),
        patientName: z.lazy(() => SortOrderSchema).optional(),
        pickupTime: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const ExternalTransportationCountOrderByAggregateInputObjectSchema = Schema;
