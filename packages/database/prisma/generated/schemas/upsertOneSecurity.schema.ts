import { z } from 'zod';
import { SecurityWhereUniqueInputObjectSchema } from './objects/SecurityWhereUniqueInput.schema';
import { SecurityCreateInputObjectSchema } from './objects/SecurityCreateInput.schema';
import { SecurityUncheckedCreateInputObjectSchema } from './objects/SecurityUncheckedCreateInput.schema';
import { SecurityUpdateInputObjectSchema } from './objects/SecurityUpdateInput.schema';
import { SecurityUncheckedUpdateInputObjectSchema } from './objects/SecurityUncheckedUpdateInput.schema';

export const SecurityUpsertSchema = z.object({
    where: SecurityWhereUniqueInputObjectSchema,
    create: z.union([SecurityCreateInputObjectSchema, SecurityUncheckedCreateInputObjectSchema]),
    update: z.union([SecurityUpdateInputObjectSchema, SecurityUncheckedUpdateInputObjectSchema]),
});
