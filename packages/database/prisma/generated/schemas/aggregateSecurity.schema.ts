import { z } from 'zod';
import { SecurityOrderByWithRelationInputObjectSchema } from './objects/SecurityOrderByWithRelationInput.schema';
import { SecurityWhereInputObjectSchema } from './objects/SecurityWhereInput.schema';
import { SecurityWhereUniqueInputObjectSchema } from './objects/SecurityWhereUniqueInput.schema';
import { SecurityCountAggregateInputObjectSchema } from './objects/SecurityCountAggregateInput.schema';
import { SecurityMinAggregateInputObjectSchema } from './objects/SecurityMinAggregateInput.schema';
import { SecurityMaxAggregateInputObjectSchema } from './objects/SecurityMaxAggregateInput.schema';
import { SecurityAvgAggregateInputObjectSchema } from './objects/SecurityAvgAggregateInput.schema';
import { SecuritySumAggregateInputObjectSchema } from './objects/SecuritySumAggregateInput.schema';

export const SecurityAggregateSchema = z.object({
    orderBy: z
        .union([
            SecurityOrderByWithRelationInputObjectSchema,
            SecurityOrderByWithRelationInputObjectSchema.array(),
        ])
        .optional(),
    where: SecurityWhereInputObjectSchema.optional(),
    cursor: SecurityWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    _count: z.union([z.literal(true), SecurityCountAggregateInputObjectSchema]).optional(),
    _min: SecurityMinAggregateInputObjectSchema.optional(),
    _max: SecurityMaxAggregateInputObjectSchema.optional(),
    _avg: SecurityAvgAggregateInputObjectSchema.optional(),
    _sum: SecuritySumAggregateInputObjectSchema.optional(),
});
