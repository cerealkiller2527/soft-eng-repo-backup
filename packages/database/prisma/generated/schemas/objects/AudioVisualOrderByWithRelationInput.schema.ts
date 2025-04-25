import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { ServiceRequestOrderByWithRelationInputObjectSchema } from './ServiceRequestOrderByWithRelationInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.AudioVisualOrderByWithRelationInput> = z
    .object({
        id: z.lazy(() => SortOrderSchema).optional(),
        location: z.lazy(() => SortOrderSchema).optional(),
        deadline: z.lazy(() => SortOrderSchema).optional(),
        audiovisualType: z.lazy(() => SortOrderSchema).optional(),
        serviceRequest: z.lazy(() => ServiceRequestOrderByWithRelationInputObjectSchema).optional(),
    })
    .strict();

export const AudioVisualOrderByWithRelationInputObjectSchema = Schema;
