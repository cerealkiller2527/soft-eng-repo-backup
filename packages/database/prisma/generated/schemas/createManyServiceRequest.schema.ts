import { z } from 'zod';
import { ServiceRequestCreateManyInputObjectSchema } from './objects/ServiceRequestCreateManyInput.schema';

export const ServiceRequestCreateManySchema = z.object({
    data: z.union([
        ServiceRequestCreateManyInputObjectSchema,
        z.array(ServiceRequestCreateManyInputObjectSchema),
    ]),
    skipDuplicates: z.boolean().optional(),
});
