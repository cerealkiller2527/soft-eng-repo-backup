import { z } from 'zod';

export const EquipmentDeliveryScalarFieldEnumSchema = z.enum([
    'id',
    'deadline',
    'equipments',
    'toWhere',
]);
