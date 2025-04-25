import { z } from 'zod';

export const LocationScalarFieldEnumSchema = z.enum([
    'id',
    'floor',
    'suite',
    'buildingId',
    'departmentId',
    'nodeID',
]);
