import type knex from "knex";

declare module 'knex/types/tables' {
  export interface Tables {
    transacoes: {
      id: string, 
      title:string,
      amount: number,
      description: string,
      sessionId: string
    }
  }
}