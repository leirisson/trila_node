import http from 'node:http'

const users = []
const server =  http.createServer( async (req, res) => {

  const {method, url} = req

  // lendo todo o cordo de stream 
  const buffers = []

  for await (const chunck of req){
    buffers.push(chunck)
  }

  //  transformando em um objeto json
  try {
    req.body = JSON.parse(Buffer.concat(buffers).toString()) 
  } catch (error) {
    req.body = null
  }
  

  if(method === 'GET' && url === '/users'){
    return res
    .setHeader('Content-type', 'application/json')
    .end(JSON.stringify(users))
  }


  if(method === 'POST' && url === '/users'){
    const {name, email} = req.body
    users.push({
      id: users.length + 1,
      name: name,
      email: email
    })

    return res.writeHead(201).end()
  }
  // array de buffers
  // for
})

server.listen(3334)