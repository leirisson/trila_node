import { FastifyInstance } from "fastify";
import { registerController } from "./controller/registerController";


export async function appRoutes(app: FastifyInstance) {
    app.post('/users', registerController)
}