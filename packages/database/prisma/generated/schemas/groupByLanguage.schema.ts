import { z } from 'zod';
import { LanguageWhereInputObjectSchema } from './objects/LanguageWhereInput.schema';
import { LanguageOrderByWithAggregationInputObjectSchema } from './objects/LanguageOrderByWithAggregationInput.schema';
import { LanguageScalarWhereWithAggregatesInputObjectSchema } from './objects/LanguageScalarWhereWithAggregatesInput.schema';
import { LanguageScalarFieldEnumSchema } from './enums/LanguageScalarFieldEnum.schema';

export const LanguageGroupBySchema = z.object({
    where: LanguageWhereInputObjectSchema.optional(),
    orderBy: z
        .union([
            LanguageOrderByWithAggregationInputObjectSchema,
            LanguageOrderByWithAggregationInputObjectSchema.array(),
        ])
        .optional(),
    having: LanguageScalarWhereWithAggregatesInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    by: z.array(LanguageScalarFieldEnumSchema),
});
