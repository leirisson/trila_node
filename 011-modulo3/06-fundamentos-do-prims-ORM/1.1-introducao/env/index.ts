import { error } from 'console'
import 'dotenv/config'
import {z} from 'zod'


const createSchemaEnc = z.object({
    NODE_ENV : z.enum(['dev',' test','production']).default('dev'),
    PORT : z.coerce.number().default(3334)
})


const prev_evn = createSchemaEnc.safeParse(process.env)

if(prev_evn.success === false){
    console.error("Erro nas variaveis de ambiente: ", prev_evn.error.format())
    throw new Error("Erro nas variaveis de ambiente.")
}

export const env = prev_evn.data