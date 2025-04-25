import { z } from 'zod';
import { DepartmentServicesWhereUniqueInputObjectSchema } from './objects/DepartmentServicesWhereUniqueInput.schema';

export const DepartmentServicesDeleteOneSchema = z.object({
    where: DepartmentServicesWhereUniqueInputObjectSchema,
});
