import 'dotenv/config'
import {z} from 'zod'



const createEnvSchema = z.object({
    NODE_ENV : z.enum(['dev', 'test','development']).default('dev'),
    PORT : z.coerce.number().default(3334)
})


const prev_env = createEnvSchema.safeParse(process.env)

if(prev_env.success === false) {
    console.error('Erro em alguma variavel de ambiente.')
    throw new Error('Erro na variavel de ambiente.')
}

export const env = prev_env.data