import { z } from 'zod';

export const AudioVisualScalarFieldEnumSchema = z.enum([
    'id',
    'location',
    'deadline',
    'audiovisualType',
]);
