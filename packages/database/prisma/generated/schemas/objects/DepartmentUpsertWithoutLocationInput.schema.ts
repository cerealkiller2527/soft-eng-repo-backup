import { z } from 'zod';
import { DepartmentUpdateWithoutLocationInputObjectSchema } from './DepartmentUpdateWithoutLocationInput.schema';
import { DepartmentUncheckedUpdateWithoutLocationInputObjectSchema } from './DepartmentUncheckedUpdateWithoutLocationInput.schema';
import { DepartmentCreateWithoutLocationInputObjectSchema } from './DepartmentCreateWithoutLocationInput.schema';
import { DepartmentUncheckedCreateWithoutLocationInputObjectSchema } from './DepartmentUncheckedCreateWithoutLocationInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.DepartmentUpsertWithoutLocationInput> = z
    .object({
        update: z.union([
            z.lazy(() => DepartmentUpdateWithoutLocationInputObjectSchema),
            z.lazy(() => DepartmentUncheckedUpdateWithoutLocationInputObjectSchema),
        ]),
        create: z.union([
            z.lazy(() => DepartmentCreateWithoutLocationInputObjectSchema),
            z.lazy(() => DepartmentUncheckedCreateWithoutLocationInputObjectSchema),
        ]),
    })
    .strict();

export const DepartmentUpsertWithoutLocationInputObjectSchema = Schema;
