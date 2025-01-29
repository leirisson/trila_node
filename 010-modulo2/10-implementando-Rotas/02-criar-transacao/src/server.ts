import fastify from 'fastify'
import cookie from '@fastify/cookie'

import { env } from '../env'
import {transactionsRoute} from  '../routes/transactions'



const app = fastify()

app.register(cookie)
app.register(transactionsRoute, {
    prefix: 'transactions'
})

app.listen({
    port: env.PORT
})
.then(() => {
    console.log(`SERVER RUING => htto://localhost:${env.PORT}`)
})