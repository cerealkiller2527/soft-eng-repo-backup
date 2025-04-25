import { z } from 'zod';
import { SecurityOrderByWithRelationInputObjectSchema } from './objects/SecurityOrderByWithRelationInput.schema';
import { SecurityWhereInputObjectSchema } from './objects/SecurityWhereInput.schema';
import { SecurityWhereUniqueInputObjectSchema } from './objects/SecurityWhereUniqueInput.schema';
import { SecurityScalarFieldEnumSchema } from './enums/SecurityScalarFieldEnum.schema';

export const SecurityFindManySchema = z.object({
    orderBy: z
        .union([
            SecurityOrderByWithRelationInputObjectSchema,
            SecurityOrderByWithRelationInputObjectSchema.array(),
        ])
        .optional(),
    where: SecurityWhereInputObjectSchema.optional(),
    cursor: SecurityWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.array(SecurityScalarFieldEnumSchema).optional(),
});
