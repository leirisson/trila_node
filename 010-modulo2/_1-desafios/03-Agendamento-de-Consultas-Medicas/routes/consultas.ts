import { FastifyInstance } from "fastify";
import { knex } from "../src/database";
import { z } from 'zod'
import { randomUUID } from 'crypto'
import { formatDate } from "../utils/FormateDate";

export function consultasRoutes(app: FastifyInstance) {
    app.get('/', async () => {

        const tables = await knex('sqlite_schema').select()
        return tables
    })

    app.post('/create', async (request, reply) => {

    
            const createSchemaConsulta = z.object({
                nome: z.string(),
                medico: z.string(),
                status: z.enum(['agendado', 'finalizado', 'cancelado'])
            })

            const { nome, medico, status } = createSchemaConsulta.parse(request.body)

            let sessionId = request.cookies.sessionId

            if (!sessionId) {
                sessionId = randomUUID()
                reply.cookie('sessionId', sessionId, {
                    path: '/',
                    maxAge: 60 * 60 * 24 * 5 // duração do cookie é de 5 dias 
                })
            }

            await knex('consultas')
                .insert({
                    id: randomUUID(),
                    nome,
                    medico,
                    data_agendamento: formatDate(new Date()) ,
                    status,
                    'session_id': sessionId
                })

            return reply.status(201).send()

      



    })
}