export class Database {
  #database = {}

  select(tabela){
    const data = this.#database[tabela] ?? []

    return data
  }

  insert(tabela, data){
    if(Array.isArray(this.#database[data])){
      this.#database[table].push(data)
    } else {
      this.#database[tabela] = [data]
    }

    return data
  }
}