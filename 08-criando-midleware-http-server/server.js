import http from 'node:http'
import { json } from './middlewares/json.js'

const allUsers = []

const server = http.createServer(async (req, res) => {
  const { method, url } = req

  await json(req, res)

  if (method === 'GET' && url === '/users') {
    return res
      .setHeader('Content-type', 'application/json')
      .end(JSON.stringify(allUsers))
  }

  if (method === 'POST' && url === '/users') {
    const { name, email } = req.body

    allUsers.push(
      {
        id: allUsers.length + 1,
        name,
        email,
      }
    )
    return res
      .writeHead(201).end()

  }
})

server.listen(3334, () => console.log('servidor está no ar: http://localhost:3334'))