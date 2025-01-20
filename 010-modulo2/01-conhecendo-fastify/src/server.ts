import fastify from "fastify";

const app = fastify()


app.get('/heelo', ()=> {
    return 'Hello word'
})


app.listen({
    port: 3333
}).then(() => {
    console.log('http server runming !')
})