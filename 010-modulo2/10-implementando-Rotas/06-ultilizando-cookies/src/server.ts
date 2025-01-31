import fastify from "fastify"
import { env } from "../env"
import { transactionRoutes } from "../routes/transactions"
import cookie from '@fastify/cookie'

const app = fastify()


app.register(cookie)
app.register(transactionRoutes, {
    prefix: 'api/v1/transactions'
})

app.listen({
    port: env.PORT
})
    .then(() => {
        console.log('server runing')
        console.log(`http://localhost:${env.PORT}`)
    })