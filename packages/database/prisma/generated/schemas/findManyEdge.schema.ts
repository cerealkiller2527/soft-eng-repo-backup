import { z } from 'zod';
import { EdgeOrderByWithRelationInputObjectSchema } from './objects/EdgeOrderByWithRelationInput.schema';
import { EdgeWhereInputObjectSchema } from './objects/EdgeWhereInput.schema';
import { EdgeWhereUniqueInputObjectSchema } from './objects/EdgeWhereUniqueInput.schema';
import { EdgeScalarFieldEnumSchema } from './enums/EdgeScalarFieldEnum.schema';

export const EdgeFindManySchema = z.object({
    orderBy: z
        .union([
            EdgeOrderByWithRelationInputObjectSchema,
            EdgeOrderByWithRelationInputObjectSchema.array(),
        ])
        .optional(),
    where: EdgeWhereInputObjectSchema.optional(),
    cursor: EdgeWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.array(EdgeScalarFieldEnumSchema).optional(),
});
