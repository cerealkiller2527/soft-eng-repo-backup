import { z } from 'zod';
import { ExternalTransportationWhereInputObjectSchema } from './objects/ExternalTransportationWhereInput.schema';

export const ExternalTransportationDeleteManySchema = z.object({
    where: ExternalTransportationWhereInputObjectSchema.optional(),
});
