import { FastifyInstance } from "fastify";
import { knex } from "../src/database";

export function transactionsRoutes(app: FastifyInstance) {
    app.get('/', async () => {

        const tables = await knex('sqlite_schema').select()

        return tables
    })
}