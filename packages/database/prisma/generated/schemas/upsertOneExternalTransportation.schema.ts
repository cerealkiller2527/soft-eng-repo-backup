import { z } from 'zod';
import { ExternalTransportationWhereUniqueInputObjectSchema } from './objects/ExternalTransportationWhereUniqueInput.schema';
import { ExternalTransportationCreateInputObjectSchema } from './objects/ExternalTransportationCreateInput.schema';
import { ExternalTransportationUncheckedCreateInputObjectSchema } from './objects/ExternalTransportationUncheckedCreateInput.schema';
import { ExternalTransportationUpdateInputObjectSchema } from './objects/ExternalTransportationUpdateInput.schema';
import { ExternalTransportationUncheckedUpdateInputObjectSchema } from './objects/ExternalTransportationUncheckedUpdateInput.schema';

export const ExternalTransportationUpsertSchema = z.object({
    where: ExternalTransportationWhereUniqueInputObjectSchema,
    create: z.union([
        ExternalTransportationCreateInputObjectSchema,
        ExternalTransportationUncheckedCreateInputObjectSchema,
    ]),
    update: z.union([
        ExternalTransportationUpdateInputObjectSchema,
        ExternalTransportationUncheckedUpdateInputObjectSchema,
    ]),
});
