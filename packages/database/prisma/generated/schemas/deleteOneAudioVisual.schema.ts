import { z } from 'zod';
import { AudioVisualWhereUniqueInputObjectSchema } from './objects/AudioVisualWhereUniqueInput.schema';

export const AudioVisualDeleteOneSchema = z.object({
    where: AudioVisualWhereUniqueInputObjectSchema,
});
