import { FastifyInstance } from "fastify"
import { knex } from "../src/database"
import { z } from 'zod'
import { randomUUID } from "node:crypto"

export function transactionsRoutes(app: FastifyInstance) {

    //resgatando todas as transações
    app.get('/', async () => {
        const transactions = await knex('transactions').select()

        return transactions
    })

    // resumindo todas as transações
    app.get('/resumo', async () => {

        const resumo = await knex('transactions').sum('amount', { as: 'resumo das transações' }).first()

        return { resumo }
    })

    app.post('/', async (request, reply) => {
        //criando um schema de transação com zod 
        // todas as requisições vão obedecer esse schema
        const createSchemaTransactionsBodySchema = z.object({
            title: z.string(),
            amount: z.number(),
            type: z.enum(['credit', 'debit'])
        })

        // desestruturando o body da resquest
        const { title, amount, type } = createSchemaTransactionsBodySchema.parse(request.body)

        //inserindo no banco de dados
        await knex('transactions')
            .insert({
                id: randomUUID(),
                title,
                amount: type === 'credit' ? amount : amount * -1
            })

        return reply.status(201).send()
    })
}