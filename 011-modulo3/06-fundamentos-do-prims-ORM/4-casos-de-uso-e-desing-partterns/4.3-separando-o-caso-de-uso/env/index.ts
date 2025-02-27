import { error } from 'console'
import 'dotenv/config'
import {z} from 'zod'

const createEnvSchema = z.object({
    NODE_ENV : z.enum(['dev', 'test', 'production']),
    PORT : z.coerce.number().default(3335)
})

const prev_env = createEnvSchema.safeParse(process.env)

if(prev_env.success === false){
    console.error('Erro ao entar buscar variavel de ambiente. ', prev_env.error.format())
    throw new Error('Erro ao tentar pegar variaveis de ambiente.')
}
