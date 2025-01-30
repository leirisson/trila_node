import { knex } from "../src/database";
import { z } from 'zod'
import { randomUUID } from 'node:crypto'

export function transactionRoutes(app) {

    //resgatando todos os dados do banco
    app.get('/', async (request, reply) => {
        const transaction = await knex('transactions').select()

        return reply.status(200).send({ transaction })
    })


    // resgatando transação por ID
    app.get('/:id', async (request, reply) => {

        const schemaID = z.object({
            id: z.string().uuid()
        })
        const { id } = schemaID.parse(request.params)

        const transaction = await knex('transactions')
            .where('id', id)
            .first()

        reply.status(200).send({ transaction })
    })

    // criando um transação
    app.post('/', async (request, reply) => {

        // criando um schema para o BODY
        const createSchemaTransactionsBodySchema = z.object({
            title: z.string(),
            amount: z.number(),
            type: z.enum(['credit', 'debit'])
        })

        // desistruturando o request.body
        const { title, amount, type } = createSchemaTransactionsBodySchema.parse(request.body)

        await knex('transactions')
            .insert({
                id: randomUUID(),
                title,
                amount: type === 'credit' ? amount : amount * -1
            })


        return reply.status(201).send()

    })

}