import { z } from 'zod';
import { ExternalTransportationOrderByWithRelationInputObjectSchema } from './objects/ExternalTransportationOrderByWithRelationInput.schema';
import { ExternalTransportationWhereInputObjectSchema } from './objects/ExternalTransportationWhereInput.schema';
import { ExternalTransportationWhereUniqueInputObjectSchema } from './objects/ExternalTransportationWhereUniqueInput.schema';
import { ExternalTransportationScalarFieldEnumSchema } from './enums/ExternalTransportationScalarFieldEnum.schema';

export const ExternalTransportationFindFirstSchema = z.object({
    orderBy: z
        .union([
            ExternalTransportationOrderByWithRelationInputObjectSchema,
            ExternalTransportationOrderByWithRelationInputObjectSchema.array(),
        ])
        .optional(),
    where: ExternalTransportationWhereInputObjectSchema.optional(),
    cursor: ExternalTransportationWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.array(ExternalTransportationScalarFieldEnumSchema).optional(),
});
