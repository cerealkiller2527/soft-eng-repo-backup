import { z } from 'zod';
import { SecurityWhereInputObjectSchema } from './objects/SecurityWhereInput.schema';
import { SecurityOrderByWithAggregationInputObjectSchema } from './objects/SecurityOrderByWithAggregationInput.schema';
import { SecurityScalarWhereWithAggregatesInputObjectSchema } from './objects/SecurityScalarWhereWithAggregatesInput.schema';
import { SecurityScalarFieldEnumSchema } from './enums/SecurityScalarFieldEnum.schema';

export const SecurityGroupBySchema = z.object({
    where: SecurityWhereInputObjectSchema.optional(),
    orderBy: z
        .union([
            SecurityOrderByWithAggregationInputObjectSchema,
            SecurityOrderByWithAggregationInputObjectSchema.array(),
        ])
        .optional(),
    having: SecurityScalarWhereWithAggregatesInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    by: z.array(SecurityScalarFieldEnumSchema),
});
