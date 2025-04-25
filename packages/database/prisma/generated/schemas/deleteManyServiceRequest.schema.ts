import { z } from 'zod';
import { ServiceRequestWhereInputObjectSchema } from './objects/ServiceRequestWhereInput.schema';

export const ServiceRequestDeleteManySchema = z.object({
    where: ServiceRequestWhereInputObjectSchema.optional(),
});
