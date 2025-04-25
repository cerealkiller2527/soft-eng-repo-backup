import { z } from 'zod';
import { EdgeWhereUniqueInputObjectSchema } from './objects/EdgeWhereUniqueInput.schema';

export const EdgeFindUniqueSchema = z.object({ where: EdgeWhereUniqueInputObjectSchema });
