import http from 'node:http'

// - criar usuarios 
// - listar usuarios
// - edução de usuarios
// - remoção de usuarios

// HTTP
// - método HTTP
// - URL

// GET, POST, DELETE, PUT, PATCH

// GET => buscar um recurso no back-end
// POST => criar um recurso no back-end
// PUT => Atualizar um recurso noback-end
// PATCH => atualizar informações especificas de um recurso no back-end
// DELETE => deletar um recursono back-end

// GET /users => buscando usuarios no back-end
// post /isers => criandoum usuario no back-end

// TIPO DE APLICAÇÃO 
// STATEFUL => GUARDA AS INFORMAÇÕES DA APLICAÇÃO EM MEMORIA 
// STATELESS => GUARDA AS INFORMAÇÕES DA APLICAÇÃO EM BANCO DE DADOS

// cabeçalhos (Requisição/Resposta) => Metadados

// HTTP status code



const users = []

const server = http.createServer((req, res) => {
  const {method, url} = req

  if (method === 'GET' && url ==='/users'){
    return res
    .setHeader('Content-type', 'application/json')
    .end(JSON.stringify(users))
  }

  if(method === 'POST' && url === '/users'){
   
    users.push({
      id:1,
      name: 'jhon Doe',
      email:'jhondoe@exemple.com'
    })
    return res.writeHead(201).end()
  }

    res.writeHead(404).end()
})

server.listen(3333, () => {
  console.log('http://localhost:3333/')
})
