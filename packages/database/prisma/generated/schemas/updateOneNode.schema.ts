import { z } from 'zod';
import { NodeUpdateInputObjectSchema } from './objects/NodeUpdateInput.schema';
import { NodeUncheckedUpdateInputObjectSchema } from './objects/NodeUncheckedUpdateInput.schema';
import { NodeWhereUniqueInputObjectSchema } from './objects/NodeWhereUniqueInput.schema';

export const NodeUpdateOneSchema = z.object({
    data: z.union([NodeUpdateInputObjectSchema, NodeUncheckedUpdateInputObjectSchema]),
    where: NodeWhereUniqueInputObjectSchema,
});
