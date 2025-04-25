import { z } from 'zod';
import { AudioVisualWhereInputObjectSchema } from './objects/AudioVisualWhereInput.schema';

export const AudioVisualDeleteManySchema = z.object({
    where: AudioVisualWhereInputObjectSchema.optional(),
});
