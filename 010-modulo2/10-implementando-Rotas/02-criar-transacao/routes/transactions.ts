import { FastifyInstance } from 'fastify'
import { knex } from '../src/database'
import { randomUUID } from 'node:crypto'
import { z } from 'zod'

export async function transactionsRoute(app: FastifyInstance) {


    // listando todas as transações
    app.get('/', async () => {

        const transactions = await knex('transactions')
        .select()
           

        return {
            transactions
        }
    })


    //  bucar por ID
    //  http:locALHOST:3333/transactions/:sdfgdgndnfg-dgdfg-drfg
    app.get('/:id', async (request) => {
        const getTransactionsParamsSchema = z.object({
            id: z.string().uuid()
        })

        const { id } = getTransactionsParamsSchema.parse(request.params)


        const transactions = await knex('transactions')
            .where('id', '=', id).first()

        return { transactions }

    })

    // somando todas as transações no banco de dados
    // listando o resumo
    
    app.get('/sumary', async () => {
        const summary = await knex('transactions')
        .sum('amount', {as:'amount'})
        .first()

        return {summary}
    })

    // criand uma transação
    app.post('/', async (request, reply) => {

        const createTransactionBodySchema = z.object({
            title: z.string(),
            amount: z.number(),
            type: z.enum(['credit', 'debit'])
        })

        const { title, amount, type } = createTransactionBodySchema.parse(request.body)

        await knex('transactions')
            .insert({
                id: randomUUID(),
                title,
                amount: type ? amount : amount * -1,
            })

        return reply.status(201).send()

    })




}