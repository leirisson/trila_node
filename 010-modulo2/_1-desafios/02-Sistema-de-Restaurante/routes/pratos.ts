import { FastifyInstance } from "fastify";
import { knex } from "../src/database";
import { z } from 'zod'
import { randomUUID } from 'node:crypto'

export function pratosRoutes(app: FastifyInstance) {

    app.get('/', async () => {
        const tables = await knex('sqlite_schema')
            .select()

        return tables
    })

    app.post('/create', async (request, reply) => {

        const createSchemaBody = z.object({
            nome: z.string(),
            preco: z.number(),
            ingredientes: z.string(),
            categoria: z.string()
        })

        const { nome, preco, ingredientes, categoria } = createSchemaBody.parse(request.body)

        let sessionId = request.cookies.sessionId
        if(!sessionId){
            sessionId = randomUUID()
            reply.cookie('sessionId', sessionId, {
                path:'/',
                maxAge: 60 *60 * 24 * 6 // o cookie expira em 6 dias
            })
        }

        await knex('pratos')
            .insert({
                id: randomUUID(),
                nome,
                preco,
                ingredientes,
                categoria,
                session_id: sessionId
            })

        return reply.status(201).send()
    })
}
