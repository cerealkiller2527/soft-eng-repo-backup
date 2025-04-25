import { z } from 'zod';
import { DepartmentServicesUpdateInputObjectSchema } from './objects/DepartmentServicesUpdateInput.schema';
import { DepartmentServicesUncheckedUpdateInputObjectSchema } from './objects/DepartmentServicesUncheckedUpdateInput.schema';
import { DepartmentServicesWhereUniqueInputObjectSchema } from './objects/DepartmentServicesWhereUniqueInput.schema';

export const DepartmentServicesUpdateOneSchema = z.object({
    data: z.union([
        DepartmentServicesUpdateInputObjectSchema,
        DepartmentServicesUncheckedUpdateInputObjectSchema,
    ]),
    where: DepartmentServicesWhereUniqueInputObjectSchema,
});
