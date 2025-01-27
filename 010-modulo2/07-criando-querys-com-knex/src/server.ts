import fastify from 'fastify'

const app = fastify()

const PORT = 3333

app.get('/transacoes', () => {

})

app.listen({
    port: PORT
})
.then(()=>{
    console.log(`http://localhost:${PORT}/api/v1/transacoes`)
})