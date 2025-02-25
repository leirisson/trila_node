import { FastifyInstance } from "fastify";
import { register } from "./controllers/registerController";

export function appRoutes(app: FastifyInstance){
    app.post('/pessoas', register)
}