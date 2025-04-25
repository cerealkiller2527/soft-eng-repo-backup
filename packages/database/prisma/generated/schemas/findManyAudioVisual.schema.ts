import { z } from 'zod';
import { AudioVisualOrderByWithRelationInputObjectSchema } from './objects/AudioVisualOrderByWithRelationInput.schema';
import { AudioVisualWhereInputObjectSchema } from './objects/AudioVisualWhereInput.schema';
import { AudioVisualWhereUniqueInputObjectSchema } from './objects/AudioVisualWhereUniqueInput.schema';
import { AudioVisualScalarFieldEnumSchema } from './enums/AudioVisualScalarFieldEnum.schema';

export const AudioVisualFindManySchema = z.object({
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
    distinct: z.array(AudioVisualScalarFieldEnumSchema).optional(),
});
