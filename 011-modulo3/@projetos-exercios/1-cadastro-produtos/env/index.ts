import 'dotenv/config'
import {z} from 'zod'

const createSchemaEnv = z.object({
    NODE_ENV : z.enum(['dev','test','production']).default('dev'),
    PORT : z.coerce.number().default(3335)
})

const prev_env = createSchemaEnv.safeParse(process.env)

if(prev_env.success === false){
    console.error('Deu ruim nas variaveis de ambiente...', prev_env.error.format())
    throw new Error('Deu ruim nas variaveis de ambiente...')
}

export const env = prev_env.data