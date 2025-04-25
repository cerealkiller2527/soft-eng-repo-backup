import { z } from 'zod';
import { AudioVisualCreateManyInputObjectSchema } from './objects/AudioVisualCreateManyInput.schema';

export const AudioVisualCreateManySchema = z.object({
    data: z.union([
        AudioVisualCreateManyInputObjectSchema,
        z.array(AudioVisualCreateManyInputObjectSchema),
    ]),
    skipDuplicates: z.boolean().optional(),
});
