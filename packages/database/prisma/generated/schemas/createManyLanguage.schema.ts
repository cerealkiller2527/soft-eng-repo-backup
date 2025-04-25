import { z } from 'zod';
import { LanguageCreateManyInputObjectSchema } from './objects/LanguageCreateManyInput.schema';

export const LanguageCreateManySchema = z.object({
    data: z.union([
        LanguageCreateManyInputObjectSchema,
        z.array(LanguageCreateManyInputObjectSchema),
    ]),
    skipDuplicates: z.boolean().optional(),
});
