import { z } from 'zod';
import { EmployeeCreateManyInputObjectSchema } from './objects/EmployeeCreateManyInput.schema';

export const EmployeeCreateManySchema = z.object({
    data: z.union([
        EmployeeCreateManyInputObjectSchema,
        z.array(EmployeeCreateManyInputObjectSchema),
    ]),
    skipDuplicates: z.boolean().optional(),
});
