import { z } from 'zod';
import { ServiceRequestWhereUniqueInputObjectSchema } from './objects/ServiceRequestWhereUniqueInput.schema';

export const ServiceRequestDeleteOneSchema = z.object({
    where: ServiceRequestWhereUniqueInputObjectSchema,
});
