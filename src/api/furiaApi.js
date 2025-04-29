import { HLTV } from 'hltv';

export async function getNextMatchFuria() {
  try {
    const data = await HLTV.getTeam({ id: 8297 }); 
    const nextMatch = data.events[0];

    return {
      opponent: nextMatch.name,
      date: nextMatch.date ? new Date(nextMatch.date).toLocaleDateString() : 'Data não definida',
      time: nextMatch.date ? new Date(nextMatch.date).toLocaleTimeString() : 'Horário indefinido',
    };
  } catch (err) {
    console.error('Erro ao buscar dados da FURIA:', err);
    return {
      opponent: 'Desconhecido',
      date: 'N/A',
      time: 'N/A'
    };
  }
}
