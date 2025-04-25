import { z } from 'zod';
import { DepartmentServicesWhereInputObjectSchema } from './objects/DepartmentServicesWhereInput.schema';
import { DepartmentServicesOrderByWithAggregationInputObjectSchema } from './objects/DepartmentServicesOrderByWithAggregationInput.schema';
import { DepartmentServicesScalarWhereWithAggregatesInputObjectSchema } from './objects/DepartmentServicesScalarWhereWithAggregatesInput.schema';
import { DepartmentServicesScalarFieldEnumSchema } from './enums/DepartmentServicesScalarFieldEnum.schema';

export const DepartmentServicesGroupBySchema = z.object({
    where: DepartmentServicesWhereInputObjectSchema.optional(),
    orderBy: z
        .union([
            DepartmentServicesOrderByWithAggregationInputObjectSchema,
            DepartmentServicesOrderByWithAggregationInputObjectSchema.array(),
        ])
        .optional(),
    having: DepartmentServicesScalarWhereWithAggregatesInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    by: z.array(DepartmentServicesScalarFieldEnumSchema),
});
