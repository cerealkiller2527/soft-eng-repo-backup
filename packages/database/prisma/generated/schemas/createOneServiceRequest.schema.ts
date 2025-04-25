import { z } from 'zod';
import { ServiceRequestCreateInputObjectSchema } from './objects/ServiceRequestCreateInput.schema';
import { ServiceRequestUncheckedCreateInputObjectSchema } from './objects/ServiceRequestUncheckedCreateInput.schema';

export const ServiceRequestCreateOneSchema = z.object({
    data: z.union([
        ServiceRequestCreateInputObjectSchema,
        ServiceRequestUncheckedCreateInputObjectSchema,
    ]),
});
