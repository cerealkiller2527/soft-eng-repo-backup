import { z } from 'zod';
import { ServiceRequestUpdateManyMutationInputObjectSchema } from './objects/ServiceRequestUpdateManyMutationInput.schema';
import { ServiceRequestWhereInputObjectSchema } from './objects/ServiceRequestWhereInput.schema';

export const ServiceRequestUpdateManySchema = z.object({
    data: ServiceRequestUpdateManyMutationInputObjectSchema,
    where: ServiceRequestWhereInputObjectSchema.optional(),
});
