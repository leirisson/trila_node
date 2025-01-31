import knex from "knex";

declare module 'knex/types/tables' {
    export interface Tables {
        transactions : {
            id: string,
            title:string,
            amount:number,
            description:string,
            sessionId:string
        }
    }
}