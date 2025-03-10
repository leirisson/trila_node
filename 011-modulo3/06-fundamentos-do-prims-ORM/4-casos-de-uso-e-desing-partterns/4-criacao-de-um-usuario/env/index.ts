import 'dotenv/config'
import {z} from 'zod'

const createSchemaEnv = z.object({
    NODE_ENV : z.enum(['dev','test','production']).default('dev'),
    PORT : z.coerce.number().default(3334)
})

const prev_env = createSchemaEnv.safeParse(process.env)

if(prev_env.success === false){
    console.error('Erro em alguma varivel de ambiente...', prev_env.error.format())
    throw new Error('Error em carregar alguma variavel de ambiente...')
}


export const env = prev_env.data