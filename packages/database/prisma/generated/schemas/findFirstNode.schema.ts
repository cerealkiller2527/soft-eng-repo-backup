import { z } from 'zod';
import { NodeOrderByWithRelationInputObjectSchema } from './objects/NodeOrderByWithRelationInput.schema';
import { NodeWhereInputObjectSchema } from './objects/NodeWhereInput.schema';
import { NodeWhereUniqueInputObjectSchema } from './objects/NodeWhereUniqueInput.schema';
import { NodeScalarFieldEnumSchema } from './enums/NodeScalarFieldEnum.schema';

export const NodeFindFirstSchema = z.object({
    orderBy: z
        .union([
            NodeOrderByWithRelationInputObjectSchema,
            NodeOrderByWithRelationInputObjectSchema.array(),
        ])
        .optional(),
    where: NodeWhereInputObjectSchema.optional(),
    cursor: NodeWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.array(NodeScalarFieldEnumSchema).optional(),
});
