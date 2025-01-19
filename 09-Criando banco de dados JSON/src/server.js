import http from 'node:http'
import { routes } from './routes/routes.js'
import { json } from './middlewares/json.js'
import { extractQueryParams } from './utils/extract-query-params.js'


const server = http.createServer(async (req, res) => {
  const { method, url } = req

  // usando middleware 
  await json(req, res)

// Query paremeter:
// Route Parameter:
// request body:


  const route = routes.find(route => {
    const validadnoRota =  route.method === method && route.path.test(url)
    return validadnoRota
  })

  // se a rota existir, chama a função handle e passa o req e res
    if(route){
      const routeParams = req.url.match(route.path)

      const {query, ...params} = routeParams.groups

      req.paramsv= params
      req.query = query ? extractQueryParams(query) : {}

      return route.handle(req, res)
  
    }

  return res.writeHead(404).end()
})

server.listen(3334, () => {
  console.log('Server is running on http://localhost:3334/users')
})