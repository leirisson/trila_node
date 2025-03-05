import { FastifyInstance } from "fastify";
import { registerController } from "./controllers/registerController";



export async function appRoutes(app: FastifyInstance){
    app.post('/users', registerController)
} 