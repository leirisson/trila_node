import 'dotenv/config'
import fastify from 'fastify'
import { env } from '../env'
import { transactionsRoutes } from '../routes/transactions'
import cookie from '@fastify/cookie'

const app = fastify()
app.register(cookie)
app.register(transactionsRoutes, {
    prefix: '/api/v1/transactions'
})

app.listen({
    port: env.PORT
})
    .then(() => {
        console.log("server ruing...")
    })