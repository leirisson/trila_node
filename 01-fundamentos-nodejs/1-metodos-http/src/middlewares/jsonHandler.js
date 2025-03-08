

export async function jsonBodyHandler(request, response){
    const buffer = []


    // coleta os chuks de dados
    for await (const chunk of request){
        buffer.push(chunk)
    }

    try {
        // concatena os chunk e converte para string. em seguida, converte para json
        request.body = JSON.parse(Buffer.concat(buffer).toString())
    } catch (error) {
        request.body = null 
    }


    // Define o Header da resposta para application/json
    response.setHeader('content-type', 'application/json')

} 