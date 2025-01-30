import fastify from 'fastify'
import { knex } from './database'
import { env } from '../env'
import { transactionsRoutes } from '../routes/transactions'
const app = fastify()

app.register(transactionsRoutes, {
  prefix: 'api/v1/transactions'
})



app.listen({
  port: env.PORT
})
  .then(() => {
    console.log("Servidor rodando...")
    console.log(`http://localhost:${env.PORT}`)
  })