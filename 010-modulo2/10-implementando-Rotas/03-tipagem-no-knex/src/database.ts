import 'dotenv/config'
import {knex as knexSetup, Knex} from  'knex'
import { env } from '../env'


export const configureKnex: Knex.Config = {
  client: env.CLIENT,
  connection: {
    filename: env.DATABASE_URL
  },
  useNullAsDefault: true,
  migrations: {
    extension: env.EXTENSION,
    directory: env.DIRECTORY
  }
}

export const knex = knexSetup(configureKnex)