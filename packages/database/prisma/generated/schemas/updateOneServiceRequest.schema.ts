import { z } from 'zod';
import { ServiceRequestUpdateInputObjectSchema } from './objects/ServiceRequestUpdateInput.schema';
import { ServiceRequestUncheckedUpdateInputObjectSchema } from './objects/ServiceRequestUncheckedUpdateInput.schema';
import { ServiceRequestWhereUniqueInputObjectSchema } from './objects/ServiceRequestWhereUniqueInput.schema';

export const ServiceRequestUpdateOneSchema = z.object({
    data: z.union([
        ServiceRequestUpdateInputObjectSchema,
        ServiceRequestUncheckedUpdateInputObjectSchema,
    ]),
    where: ServiceRequestWhereUniqueInputObjectSchema,
});
