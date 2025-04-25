import { z } from 'zod';
import { NodeWhereUniqueInputObjectSchema } from './objects/NodeWhereUniqueInput.schema';

export const NodeDeleteOneSchema = z.object({ where: NodeWhereUniqueInputObjectSchema });
