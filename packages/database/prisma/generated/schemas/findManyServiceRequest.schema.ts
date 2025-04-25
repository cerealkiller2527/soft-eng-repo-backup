import { z } from 'zod';
import { ServiceRequestOrderByWithRelationInputObjectSchema } from './objects/ServiceRequestOrderByWithRelationInput.schema';
import { ServiceRequestWhereInputObjectSchema } from './objects/ServiceRequestWhereInput.schema';
import { ServiceRequestWhereUniqueInputObjectSchema } from './objects/ServiceRequestWhereUniqueInput.schema';
import { ServiceRequestScalarFieldEnumSchema } from './enums/ServiceRequestScalarFieldEnum.schema';

export const ServiceRequestFindManySchema = z.object({
    orderBy: z
        .union([
            ServiceRequestOrderByWithRelationInputObjectSchema,
            ServiceRequestOrderByWithRelationInputObjectSchema.array(),
        ])
        .optional(),
    where: ServiceRequestWhereInputObjectSchema.optional(),
    cursor: ServiceRequestWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.array(ServiceRequestScalarFieldEnumSchema).optional(),
});
