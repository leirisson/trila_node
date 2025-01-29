import 'dotenv/config'
import { knex as knexSetup, Knex } from 'knex'
import { env } from '../env/index';


export const configKnex: Knex.Config = {
  client: 'sqlite',
  connection: {
    filename: env.DATABASE_URL
  },
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './db/migrations'
  },

}

export const knex = knexSetup(configKnex)