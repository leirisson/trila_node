import { knex as setupknex, Knex } from "knex";
import { env } from "../env";

export const confingKnex: Knex.Config = {
    client: 'sqlite',
    connection:{
        filename: env.DATABASE_URL
    },
    useNullAsDefault: true,
    migrations:{
        extension: 'ts',
        directory: env.DIRECTORY
    }
} 

export const knex = setupknex(confingKnex)