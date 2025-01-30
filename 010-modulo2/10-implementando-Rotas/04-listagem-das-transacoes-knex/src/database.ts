import 'dotenv/config'
import { env } from '../env'
import {knex as setupKnex, Knex} from 'knex'


export const configureKnex:Knex.Config = {
    client: env.CLIENT,
    connection: {
        filename: env.DATABASE_URL
    },
    useNullAsDefault: true,
    migrations:{
        extension: env.EXTENSION,
        directory: env.DIRECTORY
    }
}

export const knex = setupKnex(configureKnex)