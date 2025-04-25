import { z } from 'zod';
import { AudioVisualWhereInputObjectSchema } from './objects/AudioVisualWhereInput.schema';
import { AudioVisualOrderByWithAggregationInputObjectSchema } from './objects/AudioVisualOrderByWithAggregationInput.schema';
import { AudioVisualScalarWhereWithAggregatesInputObjectSchema } from './objects/AudioVisualScalarWhereWithAggregatesInput.schema';
import { AudioVisualScalarFieldEnumSchema } from './enums/AudioVisualScalarFieldEnum.schema';

export const AudioVisualGroupBySchema = z.object({
    where: AudioVisualWhereInputObjectSchema.optional(),
    orderBy: z
        .union([
            AudioVisualOrderByWithAggregationInputObjectSchema,
            AudioVisualOrderByWithAggregationInputObjectSchema.array(),
        ])
        .optional(),
    having: AudioVisualScalarWhereWithAggregatesInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    by: z.array(AudioVisualScalarFieldEnumSchema),
});
