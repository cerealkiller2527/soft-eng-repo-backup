import { z } from 'zod';

export const ExternalTransportationScalarFieldEnumSchema = z.enum([
    'id',
    'fromWhere',
    'toWhere',
    'transportType',
    'patientName',
    'pickupTime',
]);
