import knex from "knex";

declare module 'knex/types/table' {
  export interface Table{
    book: {
      id: string,
      title:string,
      autor: string,
      isbn: string,
      year_plublication:string,
      summary: string,
      session_id: string,
    }
  }
}