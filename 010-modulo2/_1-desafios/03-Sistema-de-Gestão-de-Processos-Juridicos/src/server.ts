import fastify from "fastify";
import { env } from "../env";
import { processosRoutes } from "../routes/processos";
import cookie from '@fastify/cookie'


const app = fastify()

app.register(cookie)
app.register(processosRoutes, {
    prefix:'api/v1/processos'
})


app.listen({
    port: env.PORT
})
    .then(() => {
        console.log('servidor rodando')
    })

