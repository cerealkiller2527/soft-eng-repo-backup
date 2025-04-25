import { z } from 'zod';
import { ExternalTransportationOrderByWithRelationInputObjectSchema } from './objects/ExternalTransportationOrderByWithRelationInput.schema';
import { ExternalTransportationWhereInputObjectSchema } from './objects/ExternalTransportationWhereInput.schema';
import { ExternalTransportationWhereUniqueInputObjectSchema } from './objects/ExternalTransportationWhereUniqueInput.schema';
import { ExternalTransportationCountAggregateInputObjectSchema } from './objects/ExternalTransportationCountAggregateInput.schema';
import { ExternalTransportationMinAggregateInputObjectSchema } from './objects/ExternalTransportationMinAggregateInput.schema';
import { ExternalTransportationMaxAggregateInputObjectSchema } from './objects/ExternalTransportationMaxAggregateInput.schema';
import { ExternalTransportationAvgAggregateInputObjectSchema } from './objects/ExternalTransportationAvgAggregateInput.schema';
import { ExternalTransportationSumAggregateInputObjectSchema } from './objects/ExternalTransportationSumAggregateInput.schema';

export const ExternalTransportationAggregateSchema = z.object({
    orderBy: z
        .union([
            ExternalTransportationOrderByWithRelationInputObjectSchema,
            ExternalTransportationOrderByWithRelationInputObjectSchema.array(),
        ])
        .optional(),
    where: ExternalTransportationWhereInputObjectSchema.optional(),
    cursor: ExternalTransportationWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    _count: z
        .union([z.literal(true), ExternalTransportationCountAggregateInputObjectSchema])
        .optional(),
    _min: ExternalTransportationMinAggregateInputObjectSchema.optional(),
    _max: ExternalTransportationMaxAggregateInputObjectSchema.optional(),
    _avg: ExternalTransportationAvgAggregateInputObjectSchema.optional(),
    _sum: ExternalTransportationSumAggregateInputObjectSchema.optional(),
});
