import { z } from 'zod';
import { LanguageWhereInputObjectSchema } from './objects/LanguageWhereInput.schema';

export const LanguageDeleteManySchema = z.object({
    where: LanguageWhereInputObjectSchema.optional(),
});
