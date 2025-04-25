import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.ServiceRequestAvgOrderByAggregateInput> = z
    .object({
        id: z.lazy(() => SortOrderSchema).optional(),
        assignedEmployeeID: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const ServiceRequestAvgOrderByAggregateInputObjectSchema = Schema;
