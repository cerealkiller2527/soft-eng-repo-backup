import { z } from 'zod';
import { LanguageUpdateManyMutationInputObjectSchema } from './objects/LanguageUpdateManyMutationInput.schema';
import { LanguageWhereInputObjectSchema } from './objects/LanguageWhereInput.schema';

export const LanguageUpdateManySchema = z.object({
    data: LanguageUpdateManyMutationInputObjectSchema,
    where: LanguageWhereInputObjectSchema.optional(),
});
