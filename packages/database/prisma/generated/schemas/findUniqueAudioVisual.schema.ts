import { z } from 'zod';
import { AudioVisualWhereUniqueInputObjectSchema } from './objects/AudioVisualWhereUniqueInput.schema';

export const AudioVisualFindUniqueSchema = z.object({
    where: AudioVisualWhereUniqueInputObjectSchema,
});
