import { z } from 'zod';
import { ExternalTransportationCreateInputObjectSchema } from './objects/ExternalTransportationCreateInput.schema';
import { ExternalTransportationUncheckedCreateInputObjectSchema } from './objects/ExternalTransportationUncheckedCreateInput.schema';

export const ExternalTransportationCreateOneSchema = z.object({
    data: z.union([
        ExternalTransportationCreateInputObjectSchema,
        ExternalTransportationUncheckedCreateInputObjectSchema,
    ]),
});
