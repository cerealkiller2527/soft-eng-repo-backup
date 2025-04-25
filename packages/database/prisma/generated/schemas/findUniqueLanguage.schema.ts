import { z } from 'zod';
import { LanguageWhereUniqueInputObjectSchema } from './objects/LanguageWhereUniqueInput.schema';

export const LanguageFindUniqueSchema = z.object({ where: LanguageWhereUniqueInputObjectSchema });
