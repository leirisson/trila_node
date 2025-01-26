import fastify from 'fastify';

const app = fastify()
const PORT = 3334
app.get('/api/v1/transacoes', async () => {
  return 'Começando com fastify'
})


app.listen({
  port: PORT
})
.then(() => {
  console.log('API na rota:')
  console.log(`http://localhost:${PORT}/api/v1/transacoes`)
})