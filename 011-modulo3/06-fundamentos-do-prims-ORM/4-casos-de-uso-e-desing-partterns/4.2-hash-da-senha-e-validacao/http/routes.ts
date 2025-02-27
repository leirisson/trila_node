import { FastifyInstance } from "fastify";
import { register } from "./controllers/registerController";


export async function appRoutes(app: FastifyInstance){
    app.post('/users', register)
}