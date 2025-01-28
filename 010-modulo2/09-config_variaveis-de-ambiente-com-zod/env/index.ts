import 'dotenv/config'
import { z } from 'zod'



const envSchema = z.object({
  NOD_ENV: z.enum(['develpment', 'test', 'production']).default('production'),
  DATABASE_URL: z.string(),
  PORT: z.number().default(3334),
})

const _env = envSchema.safeParse(process.env)
if(_env.success === false){
  console.log("Erro nas variaveis de ambiente", _env.error.format())

  throw new Error("Erro nas variaveis de ambiente")
}


export const env = _env.data

