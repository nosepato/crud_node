module.exports = (sequelize, Sequelize) => {
    const Leagues = sequelize.define("leagues",{
        name: {
            type: Sequelize.STRING
        },
        country: {
            type: Sequelize.STRING
        },
        quantity_teams: {
            type: Sequelize.INTEGER
        },
        league_value: {
            type: Sequelize.DOUBLE
        },
        is_top5: {
            type: Sequelize.BOOLEAN
        }
});

return Leagues;
};