import { FastifyInstance } from "fastify";
import { knex } from "../src/database";
import { z } from 'zod'
import { randomUUID } from 'node:crypto'


export function transactionsRoutes(app: FastifyInstance) {


    app.get('/all', async () => {
        const allTansactions = await knex('transacoes').select()

        return { allTansactions }
    })

    app.get('/one/:id', async (request, reply) => {
        const SchemaId = z.object({
            id: z.string()
        })

        const { id } = SchemaId.parse(request.params)

        const transaction = await knex('transacoes')
            .where('id', id).first()

        return { transaction }
    })

    app.post('/create', async (request, reply) => {

        const requestBodySchema = z.object({
            title: z.string(),
            amount: z.number(),
            description: z.string(),
            type: z.enum(['credit', 'debit'])
        })

        const { title, amount, description, type } = requestBodySchema.parse(request.body)
        await knex('transacoes')
            .insert({
                id: randomUUID(),
                title,
                amount: type === 'credit' ? amount : amount * -1,
                description
            })
        return reply.status(201).send()
    })

    app.delete('/delete/:id', async (request, reply) => {
        const schemaId = z.object({
            id: z.string()
        })

        const { id } = schemaId.parse(request.params)


        await knex('transacoes')
        .where('id',id)
        .delete()

        return reply.status(204).send()
    })




}

