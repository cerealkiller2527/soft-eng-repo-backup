import { z } from 'zod';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.DepartmentServicesUpdateManyMutationInput> = z.object({}).strict();

export const DepartmentServicesUpdateManyMutationInputObjectSchema = Schema;
