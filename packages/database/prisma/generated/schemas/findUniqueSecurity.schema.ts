import { z } from 'zod';
import { SecurityWhereUniqueInputObjectSchema } from './objects/SecurityWhereUniqueInput.schema';

export const SecurityFindUniqueSchema = z.object({ where: SecurityWhereUniqueInputObjectSchema });
