import { z } from 'zod';
import { SecurityCreateManyInputObjectSchema } from './objects/SecurityCreateManyInput.schema';

export const SecurityCreateManySchema = z.object({
    data: z.union([
        SecurityCreateManyInputObjectSchema,
        z.array(SecurityCreateManyInputObjectSchema),
    ]),
    skipDuplicates: z.boolean().optional(),
});
