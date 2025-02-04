import 'dotenv/config'
import { z } from 'zod'

const createSchemaEnv = z.object({
    NODE_ENV : z.enum(['production','test','development']).default('production'),
    DATABASE_URL : z.string(),
    PORT : z.number().default(3334),
    DIRECTORY: z.string()
})


const prev_env = createSchemaEnv.safeParse(process.env)

if(prev_env.success === false) {
    console.log('Deu erro nas variaveis de ambiente', prev_env.error.format())
    throw new Error('error nas variaveis de ambiente')
}

export const env = prev_env.data