import { z } from 'zod';
import { DepartmentServicesWhereUniqueInputObjectSchema } from './objects/DepartmentServicesWhereUniqueInput.schema';
import { DepartmentServicesCreateInputObjectSchema } from './objects/DepartmentServicesCreateInput.schema';
import { DepartmentServicesUncheckedCreateInputObjectSchema } from './objects/DepartmentServicesUncheckedCreateInput.schema';
import { DepartmentServicesUpdateInputObjectSchema } from './objects/DepartmentServicesUpdateInput.schema';
import { DepartmentServicesUncheckedUpdateInputObjectSchema } from './objects/DepartmentServicesUncheckedUpdateInput.schema';

export const DepartmentServicesUpsertSchema = z.object({
    where: DepartmentServicesWhereUniqueInputObjectSchema,
    create: z.union([
        DepartmentServicesCreateInputObjectSchema,
        DepartmentServicesUncheckedCreateInputObjectSchema,
    ]),
    update: z.union([
        DepartmentServicesUpdateInputObjectSchema,
        DepartmentServicesUncheckedUpdateInputObjectSchema,
    ]),
});
