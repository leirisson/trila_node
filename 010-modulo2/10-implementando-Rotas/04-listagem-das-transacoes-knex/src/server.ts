import fastify from 'fastify'
import { knex } from './database'
import { transactionRoutes } from '../routes/transactions'

const app = fastify()

app.register(transactionRoutes, {
    prefix: '/api/v1/transactions'
})


app.listen({
    port:3334
})
.then(() => {
    console.log('servidor funcionando')
    console.log(`http://localhost:3334`)
})