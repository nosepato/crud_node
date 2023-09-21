module.exports = (sequelize, Sequelize) => {
    const Teams = sequelize.define("teams", {
        name: {
            type: Sequelize.STRING
        },
        country: {
            type: Sequelize.STRING
        },
        stadium: {
            type: Sequelize.STRING
        },
        stadium_capacity: {
            type: Sequelize.INTEGER
        },
        quantity_trophies: {
            type: Sequelize.INTEGER
        },
        cast_value: {
            type: Sequelize.DOUBLE
        },
        international_champion: {
            type: Sequelize.BOOLEAN
        },
        id_leagues: {
            type: Sequelize.INTEGER,
            references: {
              model: 'leagues',
              key: 'id'
            }
        }
    });
    
    return Teams;
};