import fastify  from "fastify";
import { knex } from "./database";
import { env } from "../env";
import { consultasRoutes } from "../routes/consultas";
import cookie from '@fastify/cookie'

const app = fastify()

app.register(cookie)
app.register(consultasRoutes, {
    prefix: 'api/v1/consultas'
})


app.listen({
    port:env.PORT
})
.then(() => {
    console.log("server on....")
})