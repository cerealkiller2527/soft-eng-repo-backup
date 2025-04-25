import { z } from 'zod';
import { EdgeCreateInputObjectSchema } from './objects/EdgeCreateInput.schema';
import { EdgeUncheckedCreateInputObjectSchema } from './objects/EdgeUncheckedCreateInput.schema';

export const EdgeCreateOneSchema = z.object({
    data: z.union([EdgeCreateInputObjectSchema, EdgeUncheckedCreateInputObjectSchema]),
});
