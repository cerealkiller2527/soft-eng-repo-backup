import { z } from 'zod';
import { LanguageUpdateInputObjectSchema } from './objects/LanguageUpdateInput.schema';
import { LanguageUncheckedUpdateInputObjectSchema } from './objects/LanguageUncheckedUpdateInput.schema';
import { LanguageWhereUniqueInputObjectSchema } from './objects/LanguageWhereUniqueInput.schema';

export const LanguageUpdateOneSchema = z.object({
    data: z.union([LanguageUpdateInputObjectSchema, LanguageUncheckedUpdateInputObjectSchema]),
    where: LanguageWhereUniqueInputObjectSchema,
});
