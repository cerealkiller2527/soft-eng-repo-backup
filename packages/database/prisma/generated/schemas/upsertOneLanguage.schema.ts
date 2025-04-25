import { z } from 'zod';
import { LanguageWhereUniqueInputObjectSchema } from './objects/LanguageWhereUniqueInput.schema';
import { LanguageCreateInputObjectSchema } from './objects/LanguageCreateInput.schema';
import { LanguageUncheckedCreateInputObjectSchema } from './objects/LanguageUncheckedCreateInput.schema';
import { LanguageUpdateInputObjectSchema } from './objects/LanguageUpdateInput.schema';
import { LanguageUncheckedUpdateInputObjectSchema } from './objects/LanguageUncheckedUpdateInput.schema';

export const LanguageUpsertSchema = z.object({
    where: LanguageWhereUniqueInputObjectSchema,
    create: z.union([LanguageCreateInputObjectSchema, LanguageUncheckedCreateInputObjectSchema]),
    update: z.union([LanguageUpdateInputObjectSchema, LanguageUncheckedUpdateInputObjectSchema]),
});
