import { FastifyReply, FastifyRequest } from "fastify"

export async function checkSessionIdExists(request: FastifyRequest, reply: FastifyReply) {

    const session_id = request.cookies.session_id

    if (!session_id) {
        return reply.status(401).send({
            error: 'Não autorizado.'
        })
    }
}
