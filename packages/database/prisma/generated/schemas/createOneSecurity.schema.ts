import { z } from 'zod';
import { SecurityCreateInputObjectSchema } from './objects/SecurityCreateInput.schema';
import { SecurityUncheckedCreateInputObjectSchema } from './objects/SecurityUncheckedCreateInput.schema';

export const SecurityCreateOneSchema = z.object({
    data: z.union([SecurityCreateInputObjectSchema, SecurityUncheckedCreateInputObjectSchema]),
});
