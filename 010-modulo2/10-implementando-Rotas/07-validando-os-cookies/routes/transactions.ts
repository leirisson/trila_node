import { FastifyInstance } from "fastify";
import { kenx } from "../src/database";


export function transactionsRoutes(app: FastifyInstance){
    
    app.get('/', async () => {
    
        const tables = kenx('sqlite_schema').select()
        return tables
    })
    
    
} 

