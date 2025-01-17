import fs from 'node:fs/promises'


const databasePath = new URL('../db.json', import.meta.url)


export class Database {
  #database = {}
  constructor(){
    fs.readFile(databasePath,'utf8').then(data => {
      this.#database = JSON.parse(data)
    })
    .catch(error => {
      this.#persist()
    })
  }
 
  
  // criandoum arquivo .json para usar como banco de dados
  #persist(){
    fs.writeFile(databasePath, JSON.stringify(this.#database))
  }

  select(tabela){
    const data = this.#database[tabela] ?? []

    return data
  }

  insert(tabela, data){
    if(Array.isArray(this.#database[tabela])){
      this.#database[tabela].push(data)
    } else {
      this.#database[tabela] = [data]
    }

    this.#persist()

    console.log(this.#database)

    return data
  }
}