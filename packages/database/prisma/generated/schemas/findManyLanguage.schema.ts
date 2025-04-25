import { z } from 'zod';
import { LanguageOrderByWithRelationInputObjectSchema } from './objects/LanguageOrderByWithRelationInput.schema';
import { LanguageWhereInputObjectSchema } from './objects/LanguageWhereInput.schema';
import { LanguageWhereUniqueInputObjectSchema } from './objects/LanguageWhereUniqueInput.schema';
import { LanguageScalarFieldEnumSchema } from './enums/LanguageScalarFieldEnum.schema';

export const LanguageFindManySchema = z.object({
    orderBy: z
        .union([
            LanguageOrderByWithRelationInputObjectSchema,
            LanguageOrderByWithRelationInputObjectSchema.array(),
        ])
        .optional(),
    where: LanguageWhereInputObjectSchema.optional(),
    cursor: LanguageWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.array(LanguageScalarFieldEnumSchema).optional(),
});
