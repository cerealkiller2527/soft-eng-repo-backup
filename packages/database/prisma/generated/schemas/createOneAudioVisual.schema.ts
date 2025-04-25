import { z } from 'zod';
import { AudioVisualCreateInputObjectSchema } from './objects/AudioVisualCreateInput.schema';
import { AudioVisualUncheckedCreateInputObjectSchema } from './objects/AudioVisualUncheckedCreateInput.schema';

export const AudioVisualCreateOneSchema = z.object({
    data: z.union([
        AudioVisualCreateInputObjectSchema,
        AudioVisualUncheckedCreateInputObjectSchema,
    ]),
});
