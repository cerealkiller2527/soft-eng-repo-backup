import { z } from 'zod';
import { ExternalTransportationUpdateInputObjectSchema } from './objects/ExternalTransportationUpdateInput.schema';
import { ExternalTransportationUncheckedUpdateInputObjectSchema } from './objects/ExternalTransportationUncheckedUpdateInput.schema';
import { ExternalTransportationWhereUniqueInputObjectSchema } from './objects/ExternalTransportationWhereUniqueInput.schema';

export const ExternalTransportationUpdateOneSchema = z.object({
    data: z.union([
        ExternalTransportationUpdateInputObjectSchema,
        ExternalTransportationUncheckedUpdateInputObjectSchema,
    ]),
    where: ExternalTransportationWhereUniqueInputObjectSchema,
});
