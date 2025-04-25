import { z } from 'zod';
import { ServiceRequestWhereUniqueInputObjectSchema } from './objects/ServiceRequestWhereUniqueInput.schema';
import { ServiceRequestCreateInputObjectSchema } from './objects/ServiceRequestCreateInput.schema';
import { ServiceRequestUncheckedCreateInputObjectSchema } from './objects/ServiceRequestUncheckedCreateInput.schema';
import { ServiceRequestUpdateInputObjectSchema } from './objects/ServiceRequestUpdateInput.schema';
import { ServiceRequestUncheckedUpdateInputObjectSchema } from './objects/ServiceRequestUncheckedUpdateInput.schema';

export const ServiceRequestUpsertSchema = z.object({
    where: ServiceRequestWhereUniqueInputObjectSchema,
    create: z.union([
        ServiceRequestCreateInputObjectSchema,
        ServiceRequestUncheckedCreateInputObjectSchema,
    ]),
    update: z.union([
        ServiceRequestUpdateInputObjectSchema,
        ServiceRequestUncheckedUpdateInputObjectSchema,
    ]),
});
