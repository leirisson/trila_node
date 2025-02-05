

export function formatHora(data_agendamento: string) {
    const date_hora = new Date(data_agendamento);

    date_hora.setMinutes(0);
    date_hora.setSeconds(0);
    date_hora.setMilliseconds(0);

    let formatado = date_hora.getTime()

    return formatado
}