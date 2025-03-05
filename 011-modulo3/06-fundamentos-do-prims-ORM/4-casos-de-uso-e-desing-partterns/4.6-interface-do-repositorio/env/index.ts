import 'dotenv/config'
import {z} from 'zod'


const createEnvSchema = z.object({
    NODE_ENV : z.enum(['dev', 'test', 'production']).default('dev'),
    PORT : z.coerce.number().default(3334)
})

const prev_env = createEnvSchema.safeParse(process.env)

if(prev_env.success === false){
    console.error('❌❗ Erro nas variaveis de ambiente.', prev_env.error.format())
    throw new Error('Erro nas variaveis de ambiente...')
}

export const env = prev_env.data