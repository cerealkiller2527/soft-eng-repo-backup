import { z } from 'zod';
import { LanguageOrderByWithRelationInputObjectSchema } from './objects/LanguageOrderByWithRelationInput.schema';
import { LanguageWhereInputObjectSchema } from './objects/LanguageWhereInput.schema';
import { LanguageWhereUniqueInputObjectSchema } from './objects/LanguageWhereUniqueInput.schema';
import { LanguageCountAggregateInputObjectSchema } from './objects/LanguageCountAggregateInput.schema';
import { LanguageMinAggregateInputObjectSchema } from './objects/LanguageMinAggregateInput.schema';
import { LanguageMaxAggregateInputObjectSchema } from './objects/LanguageMaxAggregateInput.schema';
import { LanguageAvgAggregateInputObjectSchema } from './objects/LanguageAvgAggregateInput.schema';
import { LanguageSumAggregateInputObjectSchema } from './objects/LanguageSumAggregateInput.schema';

export const LanguageAggregateSchema = z.object({
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
    _count: z.union([z.literal(true), LanguageCountAggregateInputObjectSchema]).optional(),
    _min: LanguageMinAggregateInputObjectSchema.optional(),
    _max: LanguageMaxAggregateInputObjectSchema.optional(),
    _avg: LanguageAvgAggregateInputObjectSchema.optional(),
    _sum: LanguageSumAggregateInputObjectSchema.optional(),
});
