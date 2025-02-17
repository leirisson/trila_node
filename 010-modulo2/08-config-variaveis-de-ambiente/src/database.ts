import 'dotenv/config'
import { knex as setupKnex, Knex } from 'knex';

if(!process.env.DATABASE_URL){
  throw new Error('DATABASE_URL não encontrado')
}

export const configuracaoKnex: Knex.Config = {
  client: 'sqlite',
  connection: {
    filename: process.env.DATABASE_URL
  },
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './db/migrations/'
  }
}

export const knex = setupKnex(configuracaoKnex)