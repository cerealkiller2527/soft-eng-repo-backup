import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { ServiceRequestOrderByRelationAggregateInputObjectSchema } from './ServiceRequestOrderByRelationAggregateInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.EmployeeOrderByWithRelationInput> = z
    .object({
        id: z.lazy(() => SortOrderSchema).optional(),
        name: z.lazy(() => SortOrderSchema).optional(),
        employeeType: z.lazy(() => SortOrderSchema).optional(),
        canService: z.lazy(() => SortOrderSchema).optional(),
        language: z.lazy(() => SortOrderSchema).optional(),
        ServiceRequest: z
            .lazy(() => ServiceRequestOrderByRelationAggregateInputObjectSchema)
            .optional(),
    })
    .strict();

export const EmployeeOrderByWithRelationInputObjectSchema = Schema;
