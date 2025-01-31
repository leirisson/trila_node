import 'dotenv/config'
import fastify from 'fastify'
import { kenx } from "./database"
import {env} from '../env'
import { transactionsRoutes } from '../routes/transactions'

const app = fastify()

app.register(transactionsRoutes, {
    prefix: '/api/v1/transactions'
})

app.listen({
    port:env.PORT
})
    .then(() => {
        console.log("server ruing...")
    })