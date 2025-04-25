import { z } from 'zod';
import { ExternalTransportationWhereUniqueInputObjectSchema } from './objects/ExternalTransportationWhereUniqueInput.schema';

export const ExternalTransportationFindUniqueSchema = z.object({
    where: ExternalTransportationWhereUniqueInputObjectSchema,
});
