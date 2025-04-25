import { z } from 'zod';
import { EmployeeUpdateInputObjectSchema } from './objects/EmployeeUpdateInput.schema';
import { EmployeeUncheckedUpdateInputObjectSchema } from './objects/EmployeeUncheckedUpdateInput.schema';
import { EmployeeWhereUniqueInputObjectSchema } from './objects/EmployeeWhereUniqueInput.schema';

export const EmployeeUpdateOneSchema = z.object({
    data: z.union([EmployeeUpdateInputObjectSchema, EmployeeUncheckedUpdateInputObjectSchema]),
    where: EmployeeWhereUniqueInputObjectSchema,
});
