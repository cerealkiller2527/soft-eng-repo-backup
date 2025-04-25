import { z } from 'zod';
import { EmployeeWhereUniqueInputObjectSchema } from './objects/EmployeeWhereUniqueInput.schema';
import { EmployeeCreateInputObjectSchema } from './objects/EmployeeCreateInput.schema';
import { EmployeeUncheckedCreateInputObjectSchema } from './objects/EmployeeUncheckedCreateInput.schema';
import { EmployeeUpdateInputObjectSchema } from './objects/EmployeeUpdateInput.schema';
import { EmployeeUncheckedUpdateInputObjectSchema } from './objects/EmployeeUncheckedUpdateInput.schema';

export const EmployeeUpsertSchema = z.object({
    where: EmployeeWhereUniqueInputObjectSchema,
    create: z.union([EmployeeCreateInputObjectSchema, EmployeeUncheckedCreateInputObjectSchema]),
    update: z.union([EmployeeUpdateInputObjectSchema, EmployeeUncheckedUpdateInputObjectSchema]),
});
