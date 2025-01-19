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

  select(tabela, pesquisa){
    let data = this.#database[tabela] ?? []

    if(pesquisa){
      data = data.filter(row => {
        return Object.entries(pesquisa).some(([key, value]) => {
          return row[key].toLowerCase().includes(value.toLowerCase()) // deixando tudo em minúsculo, para não ter problema com case sensitive
        })
      })
    }
  

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
  update(tabela, id, data){
    const rowIndex = this.#database[tabela].findIndex(user => user.id === id)
    if (rowIndex > -1){
      this.#database[tabela][rowIndex] = {id, ...data}
      this.#persist()
    }
  }

  delete(tabela, id_user){
    const rowIndex = this.#database[tabela].findIndex(user => user.id === id_user)
    if (rowIndex > -1){
      this.#database[tabela].splice(rowIndex, 1)
      this.#persist()
    }
  }

}