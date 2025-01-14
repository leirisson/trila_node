import http from 'node:http'


const server = http.createServer((req, res)=>{
  res.end("hello word")
})

server.listen(3333, ()=>{
  console.log('http://localhost:3333/')
})
