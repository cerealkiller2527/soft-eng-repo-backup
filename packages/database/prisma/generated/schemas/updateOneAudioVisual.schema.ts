import { z } from 'zod';
import { AudioVisualUpdateInputObjectSchema } from './objects/AudioVisualUpdateInput.schema';
import { AudioVisualUncheckedUpdateInputObjectSchema } from './objects/AudioVisualUncheckedUpdateInput.schema';
import { AudioVisualWhereUniqueInputObjectSchema } from './objects/AudioVisualWhereUniqueInput.schema';

export const AudioVisualUpdateOneSchema = z.object({
    data: z.union([
        AudioVisualUpdateInputObjectSchema,
        AudioVisualUncheckedUpdateInputObjectSchema,
    ]),
    where: AudioVisualWhereUniqueInputObjectSchema,
});
