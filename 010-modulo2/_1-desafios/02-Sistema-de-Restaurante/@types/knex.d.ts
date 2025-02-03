import { Knex } from "knex";

declare module 'knex/types/table' {
    export interface Table{
        pratos: {
            id: string,
            nome: string,
            preco:number,
            ingredientes: string,
            categoria: string,
            session_id: string
        }
    }
}