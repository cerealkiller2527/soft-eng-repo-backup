import { z } from 'zod';
import { DepartmentServicesOrderByWithRelationInputObjectSchema } from './objects/DepartmentServicesOrderByWithRelationInput.schema';
import { DepartmentServicesWhereInputObjectSchema } from './objects/DepartmentServicesWhereInput.schema';
import { DepartmentServicesWhereUniqueInputObjectSchema } from './objects/DepartmentServicesWhereUniqueInput.schema';
import { DepartmentServicesCountAggregateInputObjectSchema } from './objects/DepartmentServicesCountAggregateInput.schema';
import { DepartmentServicesMinAggregateInputObjectSchema } from './objects/DepartmentServicesMinAggregateInput.schema';
import { DepartmentServicesMaxAggregateInputObjectSchema } from './objects/DepartmentServicesMaxAggregateInput.schema';
import { DepartmentServicesAvgAggregateInputObjectSchema } from './objects/DepartmentServicesAvgAggregateInput.schema';
import { DepartmentServicesSumAggregateInputObjectSchema } from './objects/DepartmentServicesSumAggregateInput.schema';

export const DepartmentServicesAggregateSchema = z.object({
    orderBy: z
        .union([
            DepartmentServicesOrderByWithRelationInputObjectSchema,
            DepartmentServicesOrderByWithRelationInputObjectSchema.array(),
        ])
        .optional(),
    where: DepartmentServicesWhereInputObjectSchema.optional(),
    cursor: DepartmentServicesWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    _count: z
        .union([z.literal(true), DepartmentServicesCountAggregateInputObjectSchema])
        .optional(),
    _min: DepartmentServicesMinAggregateInputObjectSchema.optional(),
    _max: DepartmentServicesMaxAggregateInputObjectSchema.optional(),
    _avg: DepartmentServicesAvgAggregateInputObjectSchema.optional(),
    _sum: DepartmentServicesSumAggregateInputObjectSchema.optional(),
});
