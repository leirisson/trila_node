import 'dotenv/config'
import { z } from 'zod'


const createSchemaEnv = z.object({
    NODE_ENV : z.enum(['production','test','development']).default('production'),
    DATABASE_URL : z.string(),
    DIRECTORY : z.string(),
    PORT : z.number().default(3334)
})


const prev_env = createSchemaEnv.safeParse(process.env)

if(prev_env.success ===  false){
    console.log("Deu problema ao carregar variavel de ambiente.", prev_env.error.format())
    throw new Error('Erro ao carregar vaiavei de ambiente.')
}


export const env =  prev_env.data