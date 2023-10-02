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

Liga: Brasileirão;
{
        "name": "Brasileirão",
        "country": "Brasil",
        "quantity_teams": 20,
        "league_value": 1.32,
        "is_top5":true
}
Liga: Premier League;
{
        "name": "Premier League",
        "country": "Inglaterra",
        "quantity_teams": 20,
        "league_value": 10.32,
        "is_top5":true
}
Time: Wolverhampton;
{
        "name": "Wolverhampton",
        "country": "Inglaterra",
        "stadium": "Molineaux Stadium",
        "stadium_capacity": 32050,
        "quantity_trophies": 13,
        "cast_value": 289.38,
        "id_leagues": 1,
        "international_champion": false
}
TIme: Chelsea
{
        "name": "Chelsea",
        "country": "Inglaterra",
        "stadium": "Stamford Bridge",
        "stadium_capacity": 40853,
        "quantity_trophies": 34,
        "cast_value": 925.15,
        "id_leagues": 1,
        "international_champion": true
}
Time: Corinthians;
{
        "name": "Corinthians",
        "country": "Brasil",
        "stadium": "Neo Quimica Arena",
        "stadium_capacity": 49205,
        "quantity_trophies": 51,
        "cast_value": 88.15,
        "id_leagues": 1,
        "international_champion": true
}
