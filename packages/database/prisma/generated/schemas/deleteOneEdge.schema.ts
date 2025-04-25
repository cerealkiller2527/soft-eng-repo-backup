import { z } from 'zod';
import { EdgeWhereUniqueInputObjectSchema } from './objects/EdgeWhereUniqueInput.schema';

export const EdgeDeleteOneSchema = z.object({ where: EdgeWhereUniqueInputObjectSchema });
