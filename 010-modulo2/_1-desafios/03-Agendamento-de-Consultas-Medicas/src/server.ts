import fastify  from "fastify";
import { knex } from "./database";
import { env } from "../env";
import { consultasRoutes } from "../routes/consultas";


const app = fastify()


app.register(consultasRoutes)


app.listen({
    port:env.PORT
})
.then(() => {
    console.log("server on....")
})