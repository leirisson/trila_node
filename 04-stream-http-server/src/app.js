import http from 'node:http'
import { Transform } from 'node:stream'


class InverserNumberStream extends Transform {
  _transform(chunck, encoding, callback){
    const transformed = Number(chunck.toString()) * -1

    console.log(transformed)

    callback(null, Buffer.from(String(transformed)))
  }
}

// req => ReadableStream => ler dados da requisição
// res => writableStream => escrever dados na requisição

const server = http.createServer((req, res) => {

  return req.pipe(new InverserNumberStream())
  .pipe(res)
})

server.listen(3333)