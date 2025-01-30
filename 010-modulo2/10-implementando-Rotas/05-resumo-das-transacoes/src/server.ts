import fastify from 'fastify'
import { env } from '../env'
import { transactionsRoutes } from '../routes/transactions'

const app = fastify()

app.register(transactionsRoutes, {
    prefix: "/api/v1/transactions"
})


app.listen({
    port:env.PORT
})
.then(() => {
    console.log(`http server => http://localhost:${env.PORT}`)
})