import { z } from 'zod';
import { EdgeWhereUniqueInputObjectSchema } from './objects/EdgeWhereUniqueInput.schema';
import { EdgeCreateInputObjectSchema } from './objects/EdgeCreateInput.schema';
import { EdgeUncheckedCreateInputObjectSchema } from './objects/EdgeUncheckedCreateInput.schema';
import { EdgeUpdateInputObjectSchema } from './objects/EdgeUpdateInput.schema';
import { EdgeUncheckedUpdateInputObjectSchema } from './objects/EdgeUncheckedUpdateInput.schema';

export const EdgeUpsertSchema = z.object({
    where: EdgeWhereUniqueInputObjectSchema,
    create: z.union([EdgeCreateInputObjectSchema, EdgeUncheckedCreateInputObjectSchema]),
    update: z.union([EdgeUpdateInputObjectSchema, EdgeUncheckedUpdateInputObjectSchema]),
});
