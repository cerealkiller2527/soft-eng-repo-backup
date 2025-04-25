import { z } from 'zod';
import { DepartmentServicesOrderByWithRelationInputObjectSchema } from './objects/DepartmentServicesOrderByWithRelationInput.schema';
import { DepartmentServicesWhereInputObjectSchema } from './objects/DepartmentServicesWhereInput.schema';
import { DepartmentServicesWhereUniqueInputObjectSchema } from './objects/DepartmentServicesWhereUniqueInput.schema';
import { DepartmentServicesScalarFieldEnumSchema } from './enums/DepartmentServicesScalarFieldEnum.schema';

export const DepartmentServicesFindFirstSchema = z.object({
    orderBy: z
        .union([
            DepartmentServicesOrderByWithRelationInputObjectSchema,
            DepartmentServicesOrderByWithRelationInputObjectSchema.array(),
        ])
        .optional(),
    where: DepartmentServicesWhereInputObjectSchema.optional(),
    cursor: DepartmentServicesWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.array(DepartmentServicesScalarFieldEnumSchema).optional(),
});
