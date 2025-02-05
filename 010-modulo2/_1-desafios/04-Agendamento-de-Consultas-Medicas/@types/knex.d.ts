import { Knex } from "knex"

declare module 'knex/types/tables' {
    export interface Tables {
        id:string,
        nome:string,
        medico:string,
        data_agendamento:string,
        status:string,
        session_id:string
    } 
}