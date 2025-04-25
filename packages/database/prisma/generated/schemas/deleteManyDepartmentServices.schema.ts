import { z } from 'zod';
import { DepartmentServicesWhereInputObjectSchema } from './objects/DepartmentServicesWhereInput.schema';

export const DepartmentServicesDeleteManySchema = z.object({
    where: DepartmentServicesWhereInputObjectSchema.optional(),
});
