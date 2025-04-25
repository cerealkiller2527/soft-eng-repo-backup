import { z } from 'zod';
import { AudioVisualUpdateManyMutationInputObjectSchema } from './objects/AudioVisualUpdateManyMutationInput.schema';
import { AudioVisualWhereInputObjectSchema } from './objects/AudioVisualWhereInput.schema';

export const AudioVisualUpdateManySchema = z.object({
    data: AudioVisualUpdateManyMutationInputObjectSchema,
    where: AudioVisualWhereInputObjectSchema.optional(),
});
