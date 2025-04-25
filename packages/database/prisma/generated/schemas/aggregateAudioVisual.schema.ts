import { z } from 'zod';
import { AudioVisualOrderByWithRelationInputObjectSchema } from './objects/AudioVisualOrderByWithRelationInput.schema';
import { AudioVisualWhereInputObjectSchema } from './objects/AudioVisualWhereInput.schema';
import { AudioVisualWhereUniqueInputObjectSchema } from './objects/AudioVisualWhereUniqueInput.schema';
import { AudioVisualCountAggregateInputObjectSchema } from './objects/AudioVisualCountAggregateInput.schema';
import { AudioVisualMinAggregateInputObjectSchema } from './objects/AudioVisualMinAggregateInput.schema';
import { AudioVisualMaxAggregateInputObjectSchema } from './objects/AudioVisualMaxAggregateInput.schema';
import { AudioVisualAvgAggregateInputObjectSchema } from './objects/AudioVisualAvgAggregateInput.schema';
import { AudioVisualSumAggregateInputObjectSchema } from './objects/AudioVisualSumAggregateInput.schema';

export const AudioVisualAggregateSchema = z.object({
    orderBy: z
        .union([
            AudioVisualOrderByWithRelationInputObjectSchema,
            AudioVisualOrderByWithRelationInputObjectSchema.array(),
        ])
        .optional(),
    where: AudioVisualWhereInputObjectSchema.optional(),
    cursor: AudioVisualWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    _count: z.union([z.literal(true), AudioVisualCountAggregateInputObjectSchema]).optional(),
    _min: AudioVisualMinAggregateInputObjectSchema.optional(),
    _max: AudioVisualMaxAggregateInputObjectSchema.optional(),
    _avg: AudioVisualAvgAggregateInputObjectSchema.optional(),
    _sum: AudioVisualSumAggregateInputObjectSchema.optional(),
});
