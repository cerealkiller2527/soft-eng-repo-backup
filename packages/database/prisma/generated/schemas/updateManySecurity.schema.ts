import { z } from 'zod';
import { SecurityUpdateManyMutationInputObjectSchema } from './objects/SecurityUpdateManyMutationInput.schema';
import { SecurityWhereInputObjectSchema } from './objects/SecurityWhereInput.schema';

export const SecurityUpdateManySchema = z.object({
    data: SecurityUpdateManyMutationInputObjectSchema,
    where: SecurityWhereInputObjectSchema.optional(),
});
