import {knex as setupKnex, Knex} from 'knex'


export const configureKnex: Knex.Config = {
    client: 'sqlite',
    connection: {
        filename: './db/app.db'
    },
    useNullAsDefault: true,
    migrations: {
        extension: 'ts',
        directory: './db/migrations'
    }
}

export const kenx = setupKnex(configureKnex)