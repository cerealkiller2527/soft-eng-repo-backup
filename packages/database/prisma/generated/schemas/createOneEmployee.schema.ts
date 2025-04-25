import { z } from 'zod';
import { EmployeeCreateInputObjectSchema } from './objects/EmployeeCreateInput.schema';
import { EmployeeUncheckedCreateInputObjectSchema } from './objects/EmployeeUncheckedCreateInput.schema';

export const EmployeeCreateOneSchema = z.object({
    data: z.union([EmployeeCreateInputObjectSchema, EmployeeUncheckedCreateInputObjectSchema]),
});
