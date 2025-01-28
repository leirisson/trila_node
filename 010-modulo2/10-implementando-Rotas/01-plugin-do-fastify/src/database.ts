import 'dotenv/config'
import { knex as setupKnex, Knex } from 'knex'
import { env } from '../env'


export const configKnex: Knex.Config = {
  
    client: 'sqlite',
    connection: {
        filename: env.DATABASE_URL
    },
    useNullAsDefault: true,
    migrations: {
        extension: 'ts',
        directory: env.MIGRATIONS_URL
    },

}
export const knex = setupKnex(configKnex)