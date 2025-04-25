import { z } from 'zod';
import { LanguageCreateInputObjectSchema } from './objects/LanguageCreateInput.schema';
import { LanguageUncheckedCreateInputObjectSchema } from './objects/LanguageUncheckedCreateInput.schema';

export const LanguageCreateOneSchema = z.object({
    data: z.union([LanguageCreateInputObjectSchema, LanguageUncheckedCreateInputObjectSchema]),
});
