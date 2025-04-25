import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.LocationAvgOrderByAggregateInput> = z
    .object({
        id: z.lazy(() => SortOrderSchema).optional(),
        floor: z.lazy(() => SortOrderSchema).optional(),
        buildingId: z.lazy(() => SortOrderSchema).optional(),
        departmentId: z.lazy(() => SortOrderSchema).optional(),
        nodeID: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const LocationAvgOrderByAggregateInputObjectSchema = Schema;
