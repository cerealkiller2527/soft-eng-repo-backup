import { z } from 'zod';
import { EmployeeUpdateWithoutServiceRequestInputObjectSchema } from './EmployeeUpdateWithoutServiceRequestInput.schema';
import { EmployeeUncheckedUpdateWithoutServiceRequestInputObjectSchema } from './EmployeeUncheckedUpdateWithoutServiceRequestInput.schema';
import { EmployeeCreateWithoutServiceRequestInputObjectSchema } from './EmployeeCreateWithoutServiceRequestInput.schema';
import { EmployeeUncheckedCreateWithoutServiceRequestInputObjectSchema } from './EmployeeUncheckedCreateWithoutServiceRequestInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.EmployeeUpsertWithoutServiceRequestInput> = z
    .object({
        update: z.union([
            z.lazy(() => EmployeeUpdateWithoutServiceRequestInputObjectSchema),
            z.lazy(() => EmployeeUncheckedUpdateWithoutServiceRequestInputObjectSchema),
        ]),
        create: z.union([
            z.lazy(() => EmployeeCreateWithoutServiceRequestInputObjectSchema),
            z.lazy(() => EmployeeUncheckedCreateWithoutServiceRequestInputObjectSchema),
        ]),
    })
    .strict();

export const EmployeeUpsertWithoutServiceRequestInputObjectSchema = Schema;
