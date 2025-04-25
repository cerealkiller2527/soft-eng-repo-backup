import { z } from 'zod';
import { NodeWhereUniqueInputObjectSchema } from './objects/NodeWhereUniqueInput.schema';
import { NodeCreateInputObjectSchema } from './objects/NodeCreateInput.schema';
import { NodeUncheckedCreateInputObjectSchema } from './objects/NodeUncheckedCreateInput.schema';
import { NodeUpdateInputObjectSchema } from './objects/NodeUpdateInput.schema';
import { NodeUncheckedUpdateInputObjectSchema } from './objects/NodeUncheckedUpdateInput.schema';

export const NodeUpsertSchema = z.object({
    where: NodeWhereUniqueInputObjectSchema,
    create: z.union([NodeCreateInputObjectSchema, NodeUncheckedCreateInputObjectSchema]),
    update: z.union([NodeUpdateInputObjectSchema, NodeUncheckedUpdateInputObjectSchema]),
});
