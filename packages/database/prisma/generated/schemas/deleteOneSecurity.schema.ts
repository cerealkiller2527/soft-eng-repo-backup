import { z } from 'zod';
import { SecurityWhereUniqueInputObjectSchema } from './objects/SecurityWhereUniqueInput.schema';

export const SecurityDeleteOneSchema = z.object({ where: SecurityWhereUniqueInputObjectSchema });
