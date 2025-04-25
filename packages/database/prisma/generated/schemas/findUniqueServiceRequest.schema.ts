import { z } from 'zod';
import { ServiceRequestWhereUniqueInputObjectSchema } from './objects/ServiceRequestWhereUniqueInput.schema';

export const ServiceRequestFindUniqueSchema = z.object({
    where: ServiceRequestWhereUniqueInputObjectSchema,
});
