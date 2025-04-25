import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { DepartmentServicesOrderByRelationAggregateInputObjectSchema } from './DepartmentServicesOrderByRelationAggregateInput.schema';
import { LocationOrderByRelationAggregateInputObjectSchema } from './LocationOrderByRelationAggregateInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.DepartmentOrderByWithRelationInput> = z
    .object({
        id: z.lazy(() => SortOrderSchema).optional(),
        name: z.lazy(() => SortOrderSchema).optional(),
        description: z
            .union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputObjectSchema)])
            .optional(),
        phoneNumber: z.lazy(() => SortOrderSchema).optional(),
        DepartmentServices: z
            .lazy(() => DepartmentServicesOrderByRelationAggregateInputObjectSchema)
            .optional(),
        Location: z.lazy(() => LocationOrderByRelationAggregateInputObjectSchema).optional(),
    })
    .strict();

export const DepartmentOrderByWithRelationInputObjectSchema = Schema;
