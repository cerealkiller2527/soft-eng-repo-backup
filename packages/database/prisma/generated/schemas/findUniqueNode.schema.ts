import { z } from 'zod';
import { NodeWhereUniqueInputObjectSchema } from './objects/NodeWhereUniqueInput.schema';

export const NodeFindUniqueSchema = z.object({ where: NodeWhereUniqueInputObjectSchema });
