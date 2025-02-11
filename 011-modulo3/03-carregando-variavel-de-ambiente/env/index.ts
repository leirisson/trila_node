import 'dotenv/config'
import {z} from 'zod'

const createSchemaEnv = z.object(
    {
        NODE_ENV : z.enum(['dev', 'test','production']).default('dev'),
        PORT: z.coerce.number().default(3334)
    }
)


const _env = createSchemaEnv.safeParse(process.env)

if(_env.success === false){
    console.error("🚑 🌪 Erro ao carregar as variaveis de ambiente. ", _env.error.format())
    throw new Error("🚑 🌪 Erro ao carregar as variaveis de ambiente. ")
}


export const env = _env.data