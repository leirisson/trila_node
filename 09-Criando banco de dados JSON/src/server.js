import http from 'node:http'
import { routes } from './routes/routes.js'
import { json } from './middlewares/json.js'

const server = http.createServer(async (req, res) => {
  const { method, url } = req

  // usando middleware 
  await json(req, res)

  const route = routes.find(route => {
    return route.method === method && route.path === url
  })


  // se a rota existir, chama a função handle e passa o req e res
  if(route){
    return route.handle(req, res)
  }


  return res.writeHead(404).end()
})

server.listen(3334)