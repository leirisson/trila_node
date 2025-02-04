import { knex as setupKnex, Knex } from "knex";
import { env } from "../env";

export const configureKnex: Knex.Config = {
    client: 'sqlite',
    connection: {
        filename: env.DATABASE_URL
    },
    useNullAsDefault: true,
    migrations:{
        extension: 'ts',
        directory: env.DIRECTORY
    }
}

export const knex = setupKnex(configureKnex)