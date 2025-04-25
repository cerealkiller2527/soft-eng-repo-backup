import { z } from 'zod';
import { ExternalTransportationWhereUniqueInputObjectSchema } from './objects/ExternalTransportationWhereUniqueInput.schema';

export const ExternalTransportationDeleteOneSchema = z.object({
    where: ExternalTransportationWhereUniqueInputObjectSchema,
});
