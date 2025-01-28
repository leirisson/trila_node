import fastify from 'fastify'
import { knex } from './database'
import crypto from 'node:crypto'


const app = fastify()

const PORT = 3333

app.get('/api/v1/transacoes', async () => {
    const transactions = await knex('transactions').insert({
        id: crypto.randomUUID(),
        title: "Transação de teste",
        amount: 800
    })
        .returning('*')

    return transactions
})


// trazendo todas as informações do banco
app.get('/api/v1/transacoes/pesquisa', async () => {
    const transactions = await knex('transactions').select('*')
    return transactions
})

// pesquisando com o valor do amount
app.get('/api/v1/transacoes/pesquisa-por-valor', async () => {
    const transactions = await knex('transactions')
        .where('amount', 600)
        .select('*')

        return transactions
})

app.listen({
    port: PORT
})
    .then(() => {
        console.log(`http://localhost:${PORT}/api/v1/transacoes`)
    })