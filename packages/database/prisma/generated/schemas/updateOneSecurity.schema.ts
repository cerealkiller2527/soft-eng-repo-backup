import { z } from 'zod';
import { SecurityUpdateInputObjectSchema } from './objects/SecurityUpdateInput.schema';
import { SecurityUncheckedUpdateInputObjectSchema } from './objects/SecurityUncheckedUpdateInput.schema';
import { SecurityWhereUniqueInputObjectSchema } from './objects/SecurityWhereUniqueInput.schema';

export const SecurityUpdateOneSchema = z.object({
    data: z.union([SecurityUpdateInputObjectSchema, SecurityUncheckedUpdateInputObjectSchema]),
    where: SecurityWhereUniqueInputObjectSchema,
});
