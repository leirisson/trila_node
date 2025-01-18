import http from 'node:http'
import { routes } from './routes/routes.js'
import { json } from './middlewares/json.js'


const server = http.createServer(async (req, res) => {
  const { method, url } = req

  // usando middleware 
  await json(req, res)

// Query paremeter:
// Route Parameter:
// request body:


  const route = routes.find(route => {
    return route.method === method && route.path.test(url)
  })



  try {
    if(route){
      const routeParams = req.url.match(route.path)
      const params = {...routeParams.groups}
      return route.handle(req, res)
  
    }
  
  } catch (error) {
    new  Error.messsage(error)
  }

  // se a rota existir, chama a função handle e passa o req e res
  if(route){
    return route.handle(req, res)
  }


  return res.writeHead(404).end()
})

server.listen(3334, () => {
  console.log('Server is running on http://localhost:3334/users')
})