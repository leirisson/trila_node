import "dotenv/config"
import {z} from 'zod'

const createEnvSchema = z.object({
    NODE_ENV : z.enum(['dev','test','prod']).default('dev'),
    PORT : z.coerce.number().default(3334)
})


const prev_env  = createEnvSchema.safeParse(process.env)

if(prev_env.success === false){
    console.error('Erro com as variaveis de ambiente.')
    throw new Error('Erro nas variaveis de ambiente')
}

export const env = prev_env.data