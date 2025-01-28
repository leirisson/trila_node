import 'dotenv/config'
import {z} from 'zod'

const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'test','production']).default('production'),
    DATABASE_URL: z.string(),
    MIGRATIONS_URL: z.string().default('./db/migrations/'),
    PORT: z.number().default(3334)
})

const prev_env = envSchema.safeParse(process.env)
if(prev_env.success === false){
    console.log("Erro ao tentar pegar as variaveis de ambiente: ", prev_env.error.format())

    throw new Error("Erro ao tentar pegar as variaveis de ambiente.")
}

export const env = prev_env.data