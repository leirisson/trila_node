import { knex } from "../src/database";
import { object, z } from 'zod'
import { randomUUID } from 'node:crypto'
import { FastifyInstance } from "fastify";


export function transactionRoutes(app) {

    app.get('/all', async () => {
        const allTransactions = await knex('transactions')
            .select()

        return { allTransactions }
    })

    app.get('/oneTransaction/:id', async (request) => {

        const schemaId = object({
            id: z.string()
        })

        const { id } = schemaId.parse(request.params)

        const oneTransaction = await knex('transactions')
            .where('id', id).first()
            .select()

        return {oneTransaction}
    })

    app.post('/insert', async (request, reply) => {

        // criar schema das requições
        const createSchemaBody = z.object({
            title: z.string(),
            amount: z.number(),
            description: z.string(),
            type: z.enum(['credit', 'debit'])
        })


        const { title, amount, description, type } = createSchemaBody.parse(request.body)

        await knex('transactions')
            .insert({
                id: randomUUID(),
                title,
                amount: type === 'credit' ? amount : amount * -1,
                description,
            })



        return reply.status(201).send()
    })

}