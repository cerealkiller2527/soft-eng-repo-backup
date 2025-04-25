import { z } from 'zod';
import { EmployeeOrderByWithRelationInputObjectSchema } from './objects/EmployeeOrderByWithRelationInput.schema';
import { EmployeeWhereInputObjectSchema } from './objects/EmployeeWhereInput.schema';
import { EmployeeWhereUniqueInputObjectSchema } from './objects/EmployeeWhereUniqueInput.schema';
import { EmployeeScalarFieldEnumSchema } from './enums/EmployeeScalarFieldEnum.schema';

export const EmployeeFindManySchema = z.object({
    orderBy: z
        .union([
            EmployeeOrderByWithRelationInputObjectSchema,
            EmployeeOrderByWithRelationInputObjectSchema.array(),
        ])
        .optional(),
    where: EmployeeWhereInputObjectSchema.optional(),
    cursor: EmployeeWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.array(EmployeeScalarFieldEnumSchema).optional(),
});
