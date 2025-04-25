import { z } from 'zod';
import { DepartmentServicesWhereUniqueInputObjectSchema } from './objects/DepartmentServicesWhereUniqueInput.schema';

export const DepartmentServicesFindUniqueSchema = z.object({
    where: DepartmentServicesWhereUniqueInputObjectSchema,
});
