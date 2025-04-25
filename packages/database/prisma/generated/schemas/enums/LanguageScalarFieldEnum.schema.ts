import { z } from 'zod';

export const LanguageScalarFieldEnumSchema = z.enum([
    'id',
    'location',
    'language',
    'startTime',
    'endTime',
]);
