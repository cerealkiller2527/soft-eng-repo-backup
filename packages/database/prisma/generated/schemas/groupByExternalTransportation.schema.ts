import { z } from 'zod';
import { ExternalTransportationWhereInputObjectSchema } from './objects/ExternalTransportationWhereInput.schema';
import { ExternalTransportationOrderByWithAggregationInputObjectSchema } from './objects/ExternalTransportationOrderByWithAggregationInput.schema';
import { ExternalTransportationScalarWhereWithAggregatesInputObjectSchema } from './objects/ExternalTransportationScalarWhereWithAggregatesInput.schema';
import { ExternalTransportationScalarFieldEnumSchema } from './enums/ExternalTransportationScalarFieldEnum.schema';

export const ExternalTransportationGroupBySchema = z.object({
    where: ExternalTransportationWhereInputObjectSchema.optional(),
    orderBy: z
        .union([
            ExternalTransportationOrderByWithAggregationInputObjectSchema,
            ExternalTransportationOrderByWithAggregationInputObjectSchema.array(),
        ])
        .optional(),
    having: ExternalTransportationScalarWhereWithAggregatesInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    by: z.array(ExternalTransportationScalarFieldEnumSchema),
});
