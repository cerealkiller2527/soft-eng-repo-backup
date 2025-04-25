import { z } from 'zod';
import { ServiceRequestOrderByWithRelationInputObjectSchema } from './objects/ServiceRequestOrderByWithRelationInput.schema';
import { ServiceRequestWhereInputObjectSchema } from './objects/ServiceRequestWhereInput.schema';
import { ServiceRequestWhereUniqueInputObjectSchema } from './objects/ServiceRequestWhereUniqueInput.schema';
import { ServiceRequestCountAggregateInputObjectSchema } from './objects/ServiceRequestCountAggregateInput.schema';
import { ServiceRequestMinAggregateInputObjectSchema } from './objects/ServiceRequestMinAggregateInput.schema';
import { ServiceRequestMaxAggregateInputObjectSchema } from './objects/ServiceRequestMaxAggregateInput.schema';
import { ServiceRequestAvgAggregateInputObjectSchema } from './objects/ServiceRequestAvgAggregateInput.schema';
import { ServiceRequestSumAggregateInputObjectSchema } from './objects/ServiceRequestSumAggregateInput.schema';

export const ServiceRequestAggregateSchema = z.object({
    orderBy: z
        .union([
            ServiceRequestOrderByWithRelationInputObjectSchema,
            ServiceRequestOrderByWithRelationInputObjectSchema.array(),
        ])
        .optional(),
    where: ServiceRequestWhereInputObjectSchema.optional(),
    cursor: ServiceRequestWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    _count: z.union([z.literal(true), ServiceRequestCountAggregateInputObjectSchema]).optional(),
    _min: ServiceRequestMinAggregateInputObjectSchema.optional(),
    _max: ServiceRequestMaxAggregateInputObjectSchema.optional(),
    _avg: ServiceRequestAvgAggregateInputObjectSchema.optional(),
    _sum: ServiceRequestSumAggregateInputObjectSchema.optional(),
});
