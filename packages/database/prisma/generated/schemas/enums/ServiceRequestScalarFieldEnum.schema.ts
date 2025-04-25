import { z } from 'zod';

export const ServiceRequestScalarFieldEnumSchema = z.enum([
    'id',
    'type',
    'dateCreated',
    'dateUpdated',
    'status',
    'description',
    'assignedEmployeeID',
    'fromEmployee',
    'priority',
]);
