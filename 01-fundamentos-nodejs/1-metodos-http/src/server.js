import http from 'node:http'
import { jsonBodyHandler } from './middlewares/jsonHandler.js'

const server = http.createServer(async (request, response) => {

    const {method, url} = request

    await jsonBodyHandler(request, response)

    if (method === 'GET' && url === '/products'){
        return response.end('Lista de produtos')
    }

    if(method === 'POST' && url === '/products'){

        

        return response.writeHead(201).end(JSON.stringify(request.body))
    }


    return response.writeHead(404).end('Rota não encontrada !')
})

server.listen(3003)