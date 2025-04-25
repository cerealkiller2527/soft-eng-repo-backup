import { z } from 'zod';
import { LanguageWhereUniqueInputObjectSchema } from './objects/LanguageWhereUniqueInput.schema';

export const LanguageDeleteOneSchema = z.object({ where: LanguageWhereUniqueInputObjectSchema });
