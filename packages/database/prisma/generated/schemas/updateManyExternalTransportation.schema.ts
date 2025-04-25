import { z } from 'zod';
import { ExternalTransportationUpdateManyMutationInputObjectSchema } from './objects/ExternalTransportationUpdateManyMutationInput.schema';
import { ExternalTransportationWhereInputObjectSchema } from './objects/ExternalTransportationWhereInput.schema';

export const ExternalTransportationUpdateManySchema = z.object({
    data: ExternalTransportationUpdateManyMutationInputObjectSchema,
    where: ExternalTransportationWhereInputObjectSchema.optional(),
});
