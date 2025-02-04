import { FastifyInstance } from "fastify";
import { knex } from "../src/configDatabase";
import { z } from "zod";
import { randomUUID } from 'crypto'
import { VerificarSeOSessionIdExiste } from "../middlewares/verificarSeOSessionIdExiste";

export async function processosRoutes(app: FastifyInstance) {

    app.get(
        '/all',
        {
            preHandler: [VerificarSeOSessionIdExiste],
        },
        async (request, reply) => {

        const {sessionId} = request.cookies

        console.log(sessionId)

  

        const processos = await knex('processos')
        .where({
            'session_id':sessionId
        })
        .select()
        return processos
    })

    app.post('/create', async (request, reply) => {

        try {

            const createSchemaProcesso = z.object({
                numero_do_processo: z.string(),
                nome_cliente: z.string(),
                nomde_advogado: z.string(),
                status: z.enum(['Concluído', 'Em andamento', 'Aguardando julgamento', 'Suspenso', 'Em fase de recurso'])
            })
    
            const { numero_do_processo, nome_cliente, nomde_advogado, status } = createSchemaProcesso.parse(request.body)
    
            let sessionId = request.cookies.sessionId
    
            if (!sessionId) {
                sessionId = randomUUID()
                reply.cookie('sessionId', sessionId, {
                    path: '/',
                    maxAge: 60 * 60 * 24 * 3 // esse cookie vai durar 3 dias 
                })
            }

            console.log(sessionId)

            const processos = await knex('processos').select()

            for(let processo of processos){
                if(processo.numero_do_processo === numero_do_processo){
                    return reply.send({
                        informação: "não pode ter mais de um preocesso com o mesmo número."
                    })
                }
            }
    
            await knex('processos')
                .insert(
                    {
    
                        id: randomUUID(),
                        numero_do_processo,
                        nome_cliente,
                        nomde_advogado,
                        status,
                        'session_id': sessionId
                    }
                )
    
            return reply.status(201).send()
            
        } catch (error) {
            
        }

       

    })

    app.put('/update', async (request, reply) => {
        const createSchemaUpdate = z.object({
            numero_do_processo: z.string(),
            nome_cliente: z.string(),
            nomde_advogado: z.string(),

        })

        const createSchemaID = z.object({
            status: z.enum(['','Concluído', 'Em andamento', 'Aguardando julgamento', 'Suspenso', 'Em fase de recurso'])
        })


        const { numero_do_processo, nome_cliente, nomde_advogado } = createSchemaUpdate.parse(request.body)
        const { status } = createSchemaID.parse(request.query)



        try {

            if(!status){
                return reply.status(200).send({
                    info: "precisa informar um status para o processo."
                })

            } else if (status === 'Em andamento'){
                const processo = await knex('processos')
                .where({
                    'status':status
                })
                .update(
                    {
                        numero_do_processo,
                        nome_cliente,
                        nomde_advogado
                    }
                )
                .returning('*')

                return reply.status(200).send({processo})
            } else {
                return reply.status(200).send({
                    info: "não pode ser editado um processo com o status. ", status
                })
            }

        } catch (error) {
            throw new Error("erro ao editar o processo. ", error)
        }

    })


    app.delete('/delete/:id', async (request, reply) => {
        const createSchemaID = z.object({
            id: z.string()
        })

        const { id } = createSchemaID.parse(request.params)

        await knex('processos')
            .where({
                'id': id
            })
            .delete()

        return reply.status(204).send()
    })
}