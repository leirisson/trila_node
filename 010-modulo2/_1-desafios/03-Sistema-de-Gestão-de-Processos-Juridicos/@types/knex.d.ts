import { Knex } from "knex";


declare module 'knex/types/table' {
    export interface Table {
        processos: {
            id: string,
            numero_do_processo: string,
            nome_cliente: string,
            nomede_advogado: string,
            status: string,
            session_id: string
        }
    }
}
