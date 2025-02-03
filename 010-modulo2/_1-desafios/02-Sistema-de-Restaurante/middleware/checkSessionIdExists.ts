import { FastifyReply, FastifyRequest } from "fastify";


export function checkSessionIdExists(request: FastifyRequest, reply: FastifyReply){

    const sessionId = request.cookies.sessinId

    if(!sessionId){
        return reply.status(401).send({
            erro: "Não autorizado"
        })
    }
}