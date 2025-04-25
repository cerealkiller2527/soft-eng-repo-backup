import { z } from 'zod';
import { SecurityWhereInputObjectSchema } from './objects/SecurityWhereInput.schema';

export const SecurityDeleteManySchema = z.object({
    where: SecurityWhereInputObjectSchema.optional(),
});
