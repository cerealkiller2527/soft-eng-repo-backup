import { z } from 'zod';
import { ServiceRequestWhereInputObjectSchema } from './objects/ServiceRequestWhereInput.schema';
import { ServiceRequestOrderByWithAggregationInputObjectSchema } from './objects/ServiceRequestOrderByWithAggregationInput.schema';
import { ServiceRequestScalarWhereWithAggregatesInputObjectSchema } from './objects/ServiceRequestScalarWhereWithAggregatesInput.schema';
import { ServiceRequestScalarFieldEnumSchema } from './enums/ServiceRequestScalarFieldEnum.schema';

export const ServiceRequestGroupBySchema = z.object({
    where: ServiceRequestWhereInputObjectSchema.optional(),
    orderBy: z
        .union([
            ServiceRequestOrderByWithAggregationInputObjectSchema,
            ServiceRequestOrderByWithAggregationInputObjectSchema.array(),
        ])
        .optional(),
    having: ServiceRequestScalarWhereWithAggregatesInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    by: z.array(ServiceRequestScalarFieldEnumSchema),
});
