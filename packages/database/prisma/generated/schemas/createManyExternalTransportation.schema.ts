import { z } from 'zod';
import { ExternalTransportationCreateManyInputObjectSchema } from './objects/ExternalTransportationCreateManyInput.schema';

export const ExternalTransportationCreateManySchema = z.object({
    data: z.union([
        ExternalTransportationCreateManyInputObjectSchema,
        z.array(ExternalTransportationCreateManyInputObjectSchema),
    ]),
    skipDuplicates: z.boolean().optional(),
});
