# crud_node
Projeto cadeira back-end
// Importe as bibliotecas necessárias
const { Team, League } = require('./models'); // Substitua pelos modelos e caminhos corretos
const { Op } = require('sequelize');

// Função de pesquisa de equipes por ID de liga
async function searchTeamsByLeagueId(leagueId) {
  try {
    const teams = await Team.findAll({
      where: {
        LeagueId: leagueId, // Filtre pelo ID da liga
      },
      include: [
        {
          model: League, // Inclua o modelo da liga
          required: true, // Isso define um INNER JOIN
        },
      ],
    });

    return teams;
  } catch (error) {
    throw new Error('Erro na pesquisa de equipes: ' + error.message);
  }
}

// Exemplo de uso da função de pesquisa
(async () => {
  try {
    const leagueId = 1; // Substitua pelo ID da liga desejada

    const teams = await searchTeamsByLeagueId(leagueId);
    console.log('Equipes encontradas:', teams);
  } catch (error) {
    console.error(error.message);
  }
})();

DÚVIDAS: Onde colocar as funções, configurar as funções e como utilizar.
