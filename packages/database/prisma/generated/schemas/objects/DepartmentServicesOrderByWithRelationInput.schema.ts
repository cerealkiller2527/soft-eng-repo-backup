import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { DepartmentOrderByWithRelationInputObjectSchema } from './DepartmentOrderByWithRelationInput.schema';
import { ServiceOrderByWithRelationInputObjectSchema } from './ServiceOrderByWithRelationInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.DepartmentServicesOrderByWithRelationInput> = z
    .object({
        departmentID: z.lazy(() => SortOrderSchema).optional(),
        serviceID: z.lazy(() => SortOrderSchema).optional(),
        department: z.lazy(() => DepartmentOrderByWithRelationInputObjectSchema).optional(),
        service: z.lazy(() => ServiceOrderByWithRelationInputObjectSchema).optional(),
    })
    .strict();

export const DepartmentServicesOrderByWithRelationInputObjectSchema = Schema;
