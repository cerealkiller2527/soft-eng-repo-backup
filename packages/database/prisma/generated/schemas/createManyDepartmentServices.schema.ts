import { z } from 'zod';
import { DepartmentServicesCreateManyInputObjectSchema } from './objects/DepartmentServicesCreateManyInput.schema';

export const DepartmentServicesCreateManySchema = z.object({
    data: z.union([
        DepartmentServicesCreateManyInputObjectSchema,
        z.array(DepartmentServicesCreateManyInputObjectSchema),
    ]),
    skipDuplicates: z.boolean().optional(),
});
