import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
    NODE_ENV: z.enum(['production', 'test', 'development']).default('production'),
    DATABASE_URL: z.string(),
    EXTENSION: z.string(),
    DIRECTORY: z.string(),
    CLIENT: z.string(),
    PORT: z.number().default(3335)
})


const prev_env = envSchema.safeParse(process.env)

if(prev_env.success === false) {
    console.log("Erro em varivel de ambiente: ", prev_env.error.format())
    throw new Error("Erro em variavel de ambiente.")
}

export const env = prev_env.data