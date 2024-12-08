import { z } from 'zod';

export const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  JWT_PRIVATE_KEY: z.string(),
  JWT_PUBLIC_KEY: z.string(),
  POSTGRES_USER: z.string(),
  POSTGRES_PASSWORD: z.string(),
});

export type TEnvSchema = z.infer<typeof envSchema>;
