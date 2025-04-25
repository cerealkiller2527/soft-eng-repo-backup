import { z } from 'zod';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.EdgeUpdateManyMutationInput> = z.object({}).strict();

export const EdgeUpdateManyMutationInputObjectSchema = Schema;
