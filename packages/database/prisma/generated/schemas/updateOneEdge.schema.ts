import { z } from 'zod';
import { EdgeUpdateInputObjectSchema } from './objects/EdgeUpdateInput.schema';
import { EdgeUncheckedUpdateInputObjectSchema } from './objects/EdgeUncheckedUpdateInput.schema';
import { EdgeWhereUniqueInputObjectSchema } from './objects/EdgeWhereUniqueInput.schema';

export const EdgeUpdateOneSchema = z.object({
    data: z.union([EdgeUpdateInputObjectSchema, EdgeUncheckedUpdateInputObjectSchema]),
    where: EdgeWhereUniqueInputObjectSchema,
});
