import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { ExternalTransportationCountOrderByAggregateInputObjectSchema } from './ExternalTransportationCountOrderByAggregateInput.schema';
import { ExternalTransportationAvgOrderByAggregateInputObjectSchema } from './ExternalTransportationAvgOrderByAggregateInput.schema';
import { ExternalTransportationMaxOrderByAggregateInputObjectSchema } from './ExternalTransportationMaxOrderByAggregateInput.schema';
import { ExternalTransportationMinOrderByAggregateInputObjectSchema } from './ExternalTransportationMinOrderByAggregateInput.schema';
import { ExternalTransportationSumOrderByAggregateInputObjectSchema } from './ExternalTransportationSumOrderByAggregateInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.ExternalTransportationOrderByWithAggregationInput> = z
    .object({
        id: z.lazy(() => SortOrderSchema).optional(),
        fromWhere: z.lazy(() => SortOrderSchema).optional(),
        toWhere: z.lazy(() => SortOrderSchema).optional(),
        transportType: z.lazy(() => SortOrderSchema).optional(),
        patientName: z.lazy(() => SortOrderSchema).optional(),
        pickupTime: z.lazy(() => SortOrderSchema).optional(),
        _count: z
            .lazy(() => ExternalTransportationCountOrderByAggregateInputObjectSchema)
            .optional(),
        _avg: z.lazy(() => ExternalTransportationAvgOrderByAggregateInputObjectSchema).optional(),
        _max: z.lazy(() => ExternalTransportationMaxOrderByAggregateInputObjectSchema).optional(),
        _min: z.lazy(() => ExternalTransportationMinOrderByAggregateInputObjectSchema).optional(),
        _sum: z.lazy(() => ExternalTransportationSumOrderByAggregateInputObjectSchema).optional(),
    })
    .strict();

export const ExternalTransportationOrderByWithAggregationInputObjectSchema = Schema;
