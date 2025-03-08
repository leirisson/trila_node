import http from 'node:http'
import { jsonBodyHandler } from './middlewares/jsonHandler.js'
import { routerHandler } from './middlewares/routeHandler.js'

const server = http.createServer(async (request, response) => {

    await jsonBodyHandler(request, response)

    routerHandler(request, response)
})

server.listen(3003)