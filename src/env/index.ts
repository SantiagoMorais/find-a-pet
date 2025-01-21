import { z } from "zod";
import "dotenv/config";

const envSchema = z.object({
  NODE_ENV: z.string().default("development"),
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.string(),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error(`❌ Invalid environment variables`, _env.error.format);
  throw new Error("Environment variables are not set correctly");
}

export const env = _env.data;
