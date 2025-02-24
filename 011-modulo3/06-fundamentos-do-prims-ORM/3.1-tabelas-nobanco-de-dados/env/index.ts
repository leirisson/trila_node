import 'dotenv/config'
import {z} from 'zod'

const createSchemaEnv = z.object({
    NODE_ENV : z.enum(['dev','test','development']).default('dev'),
    PORT : z.coerce.number().default(3334)
})


const prev_env = createSchemaEnv.safeParse(process.env)

if(prev_env.success === false){
    console.error('Erro em alguma variavel de ambiente verifique... ', prev_env.error.format())
    throw new Error('Erro em alguma varivael de ambiente.')
}


export const env = prev_env.data