import { z } from 'zod';

export const UserScalarFieldEnumSchema = z.enum(['username', 'password', 'email']);
