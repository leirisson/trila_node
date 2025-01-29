import fastify from 'fastify'
import { transactionsRoute } from '../routes/transactions'

const app = fastify()


app.register(transactionsRoute)




app.listen({
    port: 3333
})
    .then(() => {
        console.log("server rodando com sucesso !")
    })