import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { ServiceRequestCountOrderByAggregateInputObjectSchema } from './ServiceRequestCountOrderByAggregateInput.schema';
import { ServiceRequestAvgOrderByAggregateInputObjectSchema } from './ServiceRequestAvgOrderByAggregateInput.schema';
import { ServiceRequestMaxOrderByAggregateInputObjectSchema } from './ServiceRequestMaxOrderByAggregateInput.schema';
import { ServiceRequestMinOrderByAggregateInputObjectSchema } from './ServiceRequestMinOrderByAggregateInput.schema';
import { ServiceRequestSumOrderByAggregateInputObjectSchema } from './ServiceRequestSumOrderByAggregateInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.ServiceRequestOrderByWithAggregationInput> = z
    .object({
        id: z.lazy(() => SortOrderSchema).optional(),
        type: z.lazy(() => SortOrderSchema).optional(),
        dateCreated: z.lazy(() => SortOrderSchema).optional(),
        dateUpdated: z
            .union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputObjectSchema)])
            .optional(),
        status: z.lazy(() => SortOrderSchema).optional(),
        description: z.lazy(() => SortOrderSchema).optional(),
        assignedEmployeeID: z
            .union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputObjectSchema)])
            .optional(),
        fromEmployee: z.lazy(() => SortOrderSchema).optional(),
        priority: z.lazy(() => SortOrderSchema).optional(),
        _count: z.lazy(() => ServiceRequestCountOrderByAggregateInputObjectSchema).optional(),
        _avg: z.lazy(() => ServiceRequestAvgOrderByAggregateInputObjectSchema).optional(),
        _max: z.lazy(() => ServiceRequestMaxOrderByAggregateInputObjectSchema).optional(),
        _min: z.lazy(() => ServiceRequestMinOrderByAggregateInputObjectSchema).optional(),
        _sum: z.lazy(() => ServiceRequestSumOrderByAggregateInputObjectSchema).optional(),
    })
    .strict();

export const ServiceRequestOrderByWithAggregationInputObjectSchema = Schema;
