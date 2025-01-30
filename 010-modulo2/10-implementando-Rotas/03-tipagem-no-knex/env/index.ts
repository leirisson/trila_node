import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['develepment', 'teste', 'production']),
  DATABASE_URL: z.string(),
  PORT: z.number().default(3334),
  EXTENSION: z.string(),
  DIRECTORY: z.string(),
  CLIENT: z.string()
})


const prev_env = envSchema.safeParse(process.env)

if (prev_env.success === false) {
  console.log("Erro nas variaveis de ambiente: ", prev_env.error.format())
  throw new Error("Erro nas variaveis de ambiente.")
}

export const env = prev_env.data