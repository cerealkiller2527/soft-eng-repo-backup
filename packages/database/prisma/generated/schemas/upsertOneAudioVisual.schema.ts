import { z } from 'zod';
import { AudioVisualWhereUniqueInputObjectSchema } from './objects/AudioVisualWhereUniqueInput.schema';
import { AudioVisualCreateInputObjectSchema } from './objects/AudioVisualCreateInput.schema';
import { AudioVisualUncheckedCreateInputObjectSchema } from './objects/AudioVisualUncheckedCreateInput.schema';
import { AudioVisualUpdateInputObjectSchema } from './objects/AudioVisualUpdateInput.schema';
import { AudioVisualUncheckedUpdateInputObjectSchema } from './objects/AudioVisualUncheckedUpdateInput.schema';

export const AudioVisualUpsertSchema = z.object({
    where: AudioVisualWhereUniqueInputObjectSchema,
    create: z.union([
        AudioVisualCreateInputObjectSchema,
        AudioVisualUncheckedCreateInputObjectSchema,
    ]),
    update: z.union([
        AudioVisualUpdateInputObjectSchema,
        AudioVisualUncheckedUpdateInputObjectSchema,
    ]),
});
