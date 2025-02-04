import { FastifyInstance } from "fastify";
import { knex } from "../src/database";
import { z } from 'zod'
import { randomUUID } from 'node:crypto'
import { formateDate } from "../util/FormatDate";
import { checkSessionIdExists } from "../middleware/checkSessionIdExists";

export function pratosRoutes(app: FastifyInstance) {

    app.get(
        '/all',
        {
            preHandler: [checkSessionIdExists],
        },
        async (request, reply) => {
            try {
                const { sessionId } = request.cookies;

                const register = await knex('pratos')
                    .where({
                        'session_id': sessionId
                    })
                    .select()

                return { register }

            } catch (error) {
                request.log.error(error);
                return reply.status(500).send({ error: 'Erro interno no servidor' });
            }

            const { sessionId } = request.cookies

            console.log(sessionId)



            console.log('teste')
            return reply.status(200).send('fim')
        })

    app.get('/prato/:id', async (request, reply) => {

        const createSchemaID = z.object({
            id: z.string()
        })

        const { id } = createSchemaID.parse(request.params)

        const prato = await knex('pratos')
            .where({ 'id': id })
            .select()

        return { prato }
    })

    app.put('/update/:id', async (request, reply) => {
        const createSchemaBody = z.object({
            nome: z.string(),
            preco: z.number(),
            ingredientes: z.string(),
            categoria: z.string()
        })

        const createSchemaID = z.object({
            id: z.string()
        })

        const { nome, preco, ingredientes, categoria } = createSchemaBody.parse(request.body)
        const { id } = createSchemaID.parse(request.params)

        const edit = await knex('pratos')
            .where({
                'id': id
            })
            .update({
                nome,
                preco,
                ingredientes,
                categoria,
                updated_at: formateDate(new Date())
            })
            .returning('*')

        return reply.status(200).send({ edit })

    })

    app.post('/create', async (request, reply) => {

        const createSchemaBody = z.object({
            nome: z.string(),
            preco: z.number(),
            ingredientes: z.string(),
            categoria: z.string()
        })

        const { nome, preco, ingredientes, categoria } = createSchemaBody.parse(request.body)

        let sessionId = request.cookies.sessinId

        if (!sessionId) {
            sessionId = randomUUID()
            reply.cookie('sessionId', sessionId, {
                path: '/',
                maxAge: 60 * 60 * 24 * 6 // o cookie expira em 6 dias
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

    app.delete('/delete/:id', async (request, reply) => {
        const createSchemaID = z.object({
            id: z.string()
        })

        const { id } = createSchemaID.parse(request.params)

        await knex('pratos')
            .where({ 'id': id })
            .delete()

        return reply.status(204).send()
    })
}
