import { z } from 'zod';
import { IntFilterObjectSchema } from './IntFilter.schema';
import { StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { IntNullableFilterObjectSchema } from './IntNullableFilter.schema';
import { BuildingRelationFilterObjectSchema } from './BuildingRelationFilter.schema';
import { BuildingWhereInputObjectSchema } from './BuildingWhereInput.schema';
import { DepartmentRelationFilterObjectSchema } from './DepartmentRelationFilter.schema';
import { DepartmentWhereInputObjectSchema } from './DepartmentWhereInput.schema';
import { NodeRelationFilterObjectSchema } from './NodeRelationFilter.schema';
import { NodeWhereInputObjectSchema } from './NodeWhereInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.LocationWhereInput> = z
    .object({
        AND: z
            .union([
                z.lazy(() => LocationWhereInputObjectSchema),
                z.lazy(() => LocationWhereInputObjectSchema).array(),
            ])
            .optional(),
        OR: z
            .lazy(() => LocationWhereInputObjectSchema)
            .array()
            .optional(),
        NOT: z
            .union([
                z.lazy(() => LocationWhereInputObjectSchema),
                z.lazy(() => LocationWhereInputObjectSchema).array(),
            ])
            .optional(),
        id: z.union([z.lazy(() => IntFilterObjectSchema), z.number()]).optional(),
        floor: z.union([z.lazy(() => IntFilterObjectSchema), z.number()]).optional(),
        suite: z
            .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
            .optional()
            .nullable(),
        buildingId: z.union([z.lazy(() => IntFilterObjectSchema), z.number()]).optional(),
        departmentId: z
            .union([z.lazy(() => IntNullableFilterObjectSchema), z.number()])
            .optional()
            .nullable(),
        nodeID: z
            .union([z.lazy(() => IntNullableFilterObjectSchema), z.number()])
            .optional()
            .nullable(),
        building: z
            .union([
                z.lazy(() => BuildingRelationFilterObjectSchema),
                z.lazy(() => BuildingWhereInputObjectSchema),
            ])
            .optional(),
        Department: z
            .union([
                z.lazy(() => DepartmentRelationFilterObjectSchema),
                z.lazy(() => DepartmentWhereInputObjectSchema),
            ])
            .optional()
            .nullable(),
        node: z
            .union([
                z.lazy(() => NodeRelationFilterObjectSchema),
                z.lazy(() => NodeWhereInputObjectSchema),
            ])
            .optional()
            .nullable(),
    })
    .strict();

export const LocationWhereInputObjectSchema = Schema;
