import { z } from 'zod';
import { DepartmentServicesUpdateManyMutationInputObjectSchema } from './objects/DepartmentServicesUpdateManyMutationInput.schema';
import { DepartmentServicesWhereInputObjectSchema } from './objects/DepartmentServicesWhereInput.schema';

export const DepartmentServicesUpdateManySchema = z.object({
    data: DepartmentServicesUpdateManyMutationInputObjectSchema,
    where: DepartmentServicesWhereInputObjectSchema.optional(),
});
