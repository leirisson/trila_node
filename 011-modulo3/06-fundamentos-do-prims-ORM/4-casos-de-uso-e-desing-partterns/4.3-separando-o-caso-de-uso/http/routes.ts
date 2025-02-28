import { FastifyInstance } from "fastify";
import { registerController } from "./controllers/registerController";



export async function registerRoutes(app: FastifyInstance){
    
    app.post('/users',registerController)
}