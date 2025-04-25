import { z } from 'zod';

export const RequestTypeSchema = z.enum([
    'AUDIOVISUAL',
    'EXTERNALTRANSPORTATION',
    'EQUIPMENTDELIVERY',
    'LANGUAGE',
    'SECURITY',
]);
