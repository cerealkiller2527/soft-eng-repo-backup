import { z } from 'zod';
import { DepartmentServicesCreateInputObjectSchema } from './objects/DepartmentServicesCreateInput.schema';
import { DepartmentServicesUncheckedCreateInputObjectSchema } from './objects/DepartmentServicesUncheckedCreateInput.schema';

export const DepartmentServicesCreateOneSchema = z.object({
    data: z.union([
        DepartmentServicesCreateInputObjectSchema,
        DepartmentServicesUncheckedCreateInputObjectSchema,
    ]),
});
