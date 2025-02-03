import 'dotenv/config'
import { preprocess, z } from 'zod'


const createSchemaEnv = z.object({
    NODE_ENV: z.enum(['production','test','development']).default('production'),
    DATABASE_URL : z.string(),
    EXTENSION: z.string(),
    DIRECTORY : z.string(),
    CLIENT: z.string(),
    PORT : z.number().default(3334)
})


const prev_env = createSchemaEnv.safeParse(process.env)

if(prev_env.success === false){
    console.log("Erro nas variaveis de ambiente, ", prev_env.error.format())
    throw new Error('Error nas variaveis de ambiente.')
}

export const env = prev_env.data