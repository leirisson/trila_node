import { FastifyInstance } from "fastify";
import { knex } from "../src/database";
import { z } from 'zod'
import { randomUUID } from 'crypto'
import { formatDate } from "../utils/FormateDate";
import { formatHora } from "../utils/FormatHora";

export function consultasRoutes(app: FastifyInstance) {
    app.get('/all', async () => {

        const consultas = await knex('consultas').select()
        return consultas
    })

    app.delete('/cancelar', async (request, aply) => {

    })

    
    app.post('/create', async (request, reply) => {


        const createSchemaConsulta = z.object({
            nome: z.string(),
            medico: z.string(),
            status: z.enum(['agendado', 'finalizado', 'cancelado'])
        })

        const { nome, medico, status } = createSchemaConsulta.parse(request.body)
        let data_agendamento: string = formatDate(new Date())

        let prev_format_data_agendamento = formatHora(data_agendamento)
        let format_data_agendamento = formatDate(new Date(prev_format_data_agendamento))


        let sessionId = request.cookies.sessionId
        if (!sessionId) {
            sessionId = randomUUID()
            reply.cookie('sessionId', sessionId, {
                path: '/',
                maxAge: 60 * 60 * 24 * 5 // duração do cookie é de 5 dias 
            })
        }

        const agendamentos = await knex('consultas').select()

        for (let agendamento of agendamentos) {
            let prev_format_data_agendamento = formatHora(agendamento.data_agendamento)
            let convertido_agendamento = formatDate(new Date(prev_format_data_agendamento))

            
            if (convertido_agendamento === format_data_agendamento && agendamento.medico === medico) {
                return reply.status(200).send({ informação: "Não pode ter mais de um agedamento no mesmo horario para o mesmo medico." })
            }
        }

        await knex('consultas')
            .insert({
                id: randomUUID(),
                nome,
                medico,
                data_agendamento,
                status,
                'session_id': sessionId
            })

        return reply.status(201).send()





    })
}