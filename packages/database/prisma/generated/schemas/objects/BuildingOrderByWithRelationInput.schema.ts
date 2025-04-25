import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { LocationOrderByRelationAggregateInputObjectSchema } from './LocationOrderByRelationAggregateInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.BuildingOrderByWithRelationInput> = z
    .object({
        id: z.lazy(() => SortOrderSchema).optional(),
        name: z.lazy(() => SortOrderSchema).optional(),
        address: z.lazy(() => SortOrderSchema).optional(),
        phoneNumber: z.lazy(() => SortOrderSchema).optional(),
        Location: z.lazy(() => LocationOrderByRelationAggregateInputObjectSchema).optional(),
    })
    .strict();

export const BuildingOrderByWithRelationInputObjectSchema = Schema;
