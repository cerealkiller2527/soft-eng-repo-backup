import { z } from 'zod';
import { EmployeeCreateWithoutServiceRequestInputObjectSchema } from './EmployeeCreateWithoutServiceRequestInput.schema';
import { EmployeeUncheckedCreateWithoutServiceRequestInputObjectSchema } from './EmployeeUncheckedCreateWithoutServiceRequestInput.schema';
import { EmployeeCreateOrConnectWithoutServiceRequestInputObjectSchema } from './EmployeeCreateOrConnectWithoutServiceRequestInput.schema';
import { EmployeeUpsertWithoutServiceRequestInputObjectSchema } from './EmployeeUpsertWithoutServiceRequestInput.schema';
import { EmployeeWhereUniqueInputObjectSchema } from './EmployeeWhereUniqueInput.schema';
import { EmployeeUpdateWithoutServiceRequestInputObjectSchema } from './EmployeeUpdateWithoutServiceRequestInput.schema';
import { EmployeeUncheckedUpdateWithoutServiceRequestInputObjectSchema } from './EmployeeUncheckedUpdateWithoutServiceRequestInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.EmployeeUpdateOneWithoutServiceRequestNestedInput> = z
    .object({
        create: z
            .union([
                z.lazy(() => EmployeeCreateWithoutServiceRequestInputObjectSchema),
                z.lazy(() => EmployeeUncheckedCreateWithoutServiceRequestInputObjectSchema),
            ])
            .optional(),
        connectOrCreate: z
            .lazy(() => EmployeeCreateOrConnectWithoutServiceRequestInputObjectSchema)
            .optional(),
        upsert: z.lazy(() => EmployeeUpsertWithoutServiceRequestInputObjectSchema).optional(),
        disconnect: z.boolean().optional(),
        delete: z.boolean().optional(),
        connect: z.lazy(() => EmployeeWhereUniqueInputObjectSchema).optional(),
        update: z
            .union([
                z.lazy(() => EmployeeUpdateWithoutServiceRequestInputObjectSchema),
                z.lazy(() => EmployeeUncheckedUpdateWithoutServiceRequestInputObjectSchema),
            ])
            .optional(),
    })
    .strict();

export const EmployeeUpdateOneWithoutServiceRequestNestedInputObjectSchema = Schema;
