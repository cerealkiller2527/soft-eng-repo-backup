import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { BuildingOrderByWithRelationInputObjectSchema } from './BuildingOrderByWithRelationInput.schema';
import { DepartmentOrderByWithRelationInputObjectSchema } from './DepartmentOrderByWithRelationInput.schema';
import { NodeOrderByWithRelationInputObjectSchema } from './NodeOrderByWithRelationInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.LocationOrderByWithRelationInput> = z
    .object({
        id: z.lazy(() => SortOrderSchema).optional(),
        floor: z.lazy(() => SortOrderSchema).optional(),
        suite: z
            .union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputObjectSchema)])
            .optional(),
        buildingId: z.lazy(() => SortOrderSchema).optional(),
        departmentId: z
            .union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputObjectSchema)])
            .optional(),
        nodeID: z
            .union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputObjectSchema)])
            .optional(),
        building: z.lazy(() => BuildingOrderByWithRelationInputObjectSchema).optional(),
        Department: z.lazy(() => DepartmentOrderByWithRelationInputObjectSchema).optional(),
        node: z.lazy(() => NodeOrderByWithRelationInputObjectSchema).optional(),
    })
    .strict();

export const LocationOrderByWithRelationInputObjectSchema = Schema;
