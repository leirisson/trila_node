import { FastifyInstance } from 'fastify'
import { knex } from '../src/database'
import { randomUUID } from 'node:crypto'
import { z } from 'zod'
import { request } from 'node:http'
import { checkSessionIdExists } from '../middlewares/check-session-id-exist'

export async function transactionsRoute(app: FastifyInstance) {


    // listando todas as transações
    app.get('/', {
        preHandler: [checkSessionIdExists],
    }, async (request) => {

        const { session_id } = request.cookies

        const transactions = await knex('transactions').select()

        return {
            transactions
        }
    })


    //  bucar por ID
    //  http:locALHOST:3333/transactions/:sdfgdgndnfg-dgdfg-drfg
    app.get('/:id', {
        preHandler: [checkSessionIdExists],
    }, async (request) => {
        const getTransactionsParamsSchema = z.object({
            id: z.string().uuid()
        })

        const { id } = getTransactionsParamsSchema.parse(request.params)

        const { session_id } = request.cookies


        const transactions = await knex('transactions')
            .where({
                session_id: session_id,
                id,
            }).first()

        return { transactions }

    })

    // somando todas as transações no banco de dados
    // listando o resumo

    app.get('/sumary', {
        preHandler: [checkSessionIdExists],
    }, async (request) => {

        const { session_id } = request.cookies

        const summary = await knex('transactions')
            .where('session_id', session_id)
            .sum('amount', { as: 'amount' })

            .first()

        return { summary }
    })

    // criando uma transação
    app.post('/', async (request, reply) => {

        const createTransactionBodySchema = z.object({
            title: z.string(),
            amount: z.number(),
            type: z.enum(['credit', 'debit'])
        })

        const { title, amount, type } = createTransactionBodySchema.parse(request.body)

        let session_id = request.cookies.session_id

        if (!session_id) {
            session_id = randomUUID()

            reply.cookie('session_id', session_id, {
                path: '/',
                maxAge: 60 * 60 * 24 * 7 // 7 dura 7 dias
            })
        }

        await knex('transactions')
            .insert({
                id: randomUUID(),
                title,
                amount: type ? amount : amount * -1,
                session_id,
            })

        return reply.status(201).send()

    })




}