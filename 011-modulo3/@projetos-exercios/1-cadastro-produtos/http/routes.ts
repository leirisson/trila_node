import { FastifyInstance } from "fastify";
import { registerProduct } from "./controller/productsController";


export function appRoutes(app: FastifyInstance){
    app.post('/products', registerProduct)
}