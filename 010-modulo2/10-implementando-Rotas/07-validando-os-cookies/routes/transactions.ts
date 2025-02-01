import { FastifyInstance } from "fastify";
import { knex } from "../src/database";
import { z } from 'zod'
import { randomUUID } from 'node:crypto'
import { checkSessionIdExits } from "../middlewares/checkosessionId-exist";


export function transactionsRoutes(app: FastifyInstance) {

    app.get('/all', {
        preHandler: [checkSessionIdExits],
    }, async (request, reply) => {

        const { sessionId } = request.cookies

        const allTansactions = await knex('transacoes')
            .where('sessionId', sessionId)
            .select()

        return { allTansactions }
    })

    app.get('/one/:id', {
        preHandler: [checkSessionIdExits],
    }, async (request, reply) => {
        const SchemaId = z.object({
            id: z.string()
        })

        const { id } = SchemaId.parse(request.params)
        const { sessionId } = request.cookies

        const transaction = await knex('transacoes')
            .where({
                sessionId,
                id
            }).first()

        return { transaction }
    })

    app.get('/resumo', {
        preHandler: [checkSessionIdExits],
    }, async () => {
        const resumo = await knex('transacoes')
            .sum('amount', { as: 'amount' })
            .first()
        return { resumo }
    })

    app.post('/create', async (request, reply) => {

        const requestBodySchema = z.object({
            title: z.string(),
            amount: z.number(),
            description: z.string(),
            type: z.enum(['credit', 'debit'])
        })

        const { title, amount, description, type } = requestBodySchema.parse(request.body)

        // criando um sessionId => para o usuario
        let sessionId = request.cookies.sessionId
        if (!sessionId) {
            sessionId = randomUUID()
            reply.cookie('sessionId', sessionId, {
                path: '/',
                maxAge: 60 * 60 * 24 * 7 // esse sessionId vai durar 7 dias 
            })
        }

        await knex('transacoes')
            .insert({
                id: randomUUID(),
                title,
                amount: type === 'credit' ? amount : amount * -1,
                description,
                sessionId
            })
        return reply.status(201).send()
    })

    app.put('/all-update/:id', {
        preHandler: [checkSessionIdExits],
    }, async (request, reply) => {
        const createSchemaId = z.object({
            id: z.string()
        })

        const createSchemaBody = z.object({
            title: z.string(),
            amount: z.number(),
            description: z.string(),
        })


        const { id } = createSchemaId.parse(request.params)

        const { title, amount, description } = createSchemaBody.parse(request.body)

        const { sessionId } = request.cookies

        const transactionAtualizada = await knex('transacoes')
            .where({
                sessionId,
                id
            })
            .first()
            .update({
                title,
                amount,
                description
            })
            .returning('*')

        return { transactionAtualizada }

    })

    app.delete('/delete/:id', {
        preHandler: [checkSessionIdExits],
    }, async (request, reply) => {
        const schemaId = z.object({
            id: z.string()
        })

        const { id } = schemaId.parse(request.params)
        const { sessionId } = request.cookies


        await knex('transacoes')
            .where({
                sessionId,
                id
            })
            .delete()

        return reply.status(204).send()
    })




}

