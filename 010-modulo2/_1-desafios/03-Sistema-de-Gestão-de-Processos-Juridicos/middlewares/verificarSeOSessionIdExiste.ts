import { FastifyReply, FastifyRequest } from "fastify";



export async  function VerificarSeOSessionIdExiste(
    request: FastifyRequest,
    reply: FastifyReply
){
    const {sessionId} = request.cookies

    if(!sessionId){
        return reply.status(404).send({error: "Você não tem altorização"})
    }
}