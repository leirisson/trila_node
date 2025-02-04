import { Knex } from "knex";

declare module 'knex/types/tables' {
    export interface Tables{
        pratos: {
            id: string,
            nome: string,
            preco:number,
            ingredientes: string,
            categoria: string,
            session_id: string,
        }
    }
}