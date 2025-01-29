import { knex } from "../src/database"
import { FastifyInstance } from 'fastify'



export async function transactionsRoute(app: FastifyInstance){



// crinado banco de dados 
app.get('/', async () => {
    const tabelas = await  knex('sqlite_schema').select()
    return tabelas
})

// inderindo dados no banco de dados, com o inert do knex 
app.get('/insert-transactoins', async () => {
    const insert = await knex('transacoes').insert({
        id: crypto.randomUUID(),
        title: "Deposito",
        amount: 190,
        session_id: crypto.randomUUID()
    })
        .returning('*')

    return insert
})

// resgatando todas as transações
app.get('/resgate-transacoes', async () => {
    const resgateTodos = await knex('transacoes')
        .select('*')
    return resgateTodos
})


// resgate com filtro com:
// dirente
// maior
// menor
// igual

app.get("/resgate-com-filtro", async () => {
    const filtro = await knex('transacoes')
        .where("amount", '<', 200) // filtra o amount maior que 100 

    return filtro
})

// rota para editar 
app.get('/update', async () => {
    const updatde = await knex('transacoes')
        .update({ amount: 100 })
        .where("amount", "<", 150)
        .returning('*')

    return updatde
})


// rota para deletar
app.get('/delete', async () => {
    const deletetar = await knex('transacoes')
        .where("amount", '<', 200)
        .del()
        .returning('*')

    return deletetar
})

}