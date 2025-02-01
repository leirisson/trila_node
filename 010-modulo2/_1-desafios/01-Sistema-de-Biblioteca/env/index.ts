import 'dotenv/config'
import {z} from 'zod'

const createEnvSchema = z.object({
  NODE_ENV: z.enum(['production','test','development']).default('production'),
  DATABASE_URL: z.string(),
  EXTENSION: z.string(),
  DIRECTORY: z.string(),
  CLIENT: z.string(),
  PORT: z.number().default(3334)
})


const prev_env = createEnvSchema.safeParse(process.env)

if(prev_env.success === false){
  console.log("Erro em uma vaviavel de ambiente. => ", prev_env.error.format())
  throw new Error("Erro em uma variavel de ambiente, corrija.")
}

export const env = prev_env.data