import { z } from 'zod';
import { NodeCreateInputObjectSchema } from './objects/NodeCreateInput.schema';
import { NodeUncheckedCreateInputObjectSchema } from './objects/NodeUncheckedCreateInput.schema';

export const NodeCreateOneSchema = z.object({
    data: z.union([NodeCreateInputObjectSchema, NodeUncheckedCreateInputObjectSchema]),
});
