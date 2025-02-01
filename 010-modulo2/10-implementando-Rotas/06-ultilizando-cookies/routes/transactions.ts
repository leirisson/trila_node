import { knex } from "../src/database";
import { object, z } from 'zod'
import { randomUUID } from 'node:crypto'
import { FastifyInstance } from "fastify";


export function transactionRoutes(app: FastifyInstance) {



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

        return { oneTransaction }
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

        let sessionId = request.cookies.sessionId

        if (!sessionId) {
            sessionId = randomUUID()
            
            reply.cookie('sessionId', sessionId, {
                path: '/',
                maxAge: 60 * 60 * 24 * 7 // dura 7 dias duração do ID
            })
        }

        await knex('transactions')
            .insert({
                id: randomUUID(),
                title,
                amount: type === 'credit' ? amount : amount * -1,
                description,
                sessionId,
            })



        return reply.status(201).send()
    })

}