import { FastifyInstance } from "fastify";
import { register } from "./controller/registerController";


export function appRoutes(app: FastifyInstance){
    app.post('/users', register)
}