const db = require("../models");
const Team = db.teams;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.name) {
        res.status(400).send({
            message: "Conteúdo não pode ser vazio!"
        });
        return;
    }

    const team = {
        name: req.body.name,
        country: req.body.country,
        stadium: req.body.stadium,
        stadium_capacity: req.body.stadium_capacity,
        quantity_trophies: req.body.quantity_trophies,
        cast_value: req.body.cast_value,
        id_leagues: req.body.id_leagues,
        international_champion: req.body.international_champion ? req.body.international_champion: false
    }

    Team.create(team)
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Algum erro aconteceu ao tentar criar um time."
        })
    })
};


exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.iLike]: `%${name}%`} } :null;

    console.log(req);

    Team.findAll({where: condition})
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Algum erro aconteceu ao tentar pesquisar pelos times."
        })
    })
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Team.findByPk(id)
        .then(data => {
            if (data){
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Não foi possível encontrar um time com o id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Ocorreu um erro ao tentar encontrar um time com o id=" + id
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Team.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "O time foi atualizado de maneira bem sucedida."
                });
            } else {
                res.send({
                    message: `Não foi possível atualizar o time com o id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Ocorreu um erro ao tentar atualizar um time como o id=" + id
            });
        });   
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Team.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "O time foi apagado com sucesso!"
                });
            } else {
                res.send({
                    message: `Não foi possível apagar o time com o id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Ocorreu um erro ao tentar apagar o time com o id=" + id
            });
        });
};

exports.deleteAll = (req, res) => {
    Team.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({message: `${nums} itens foram apagados com sucesso.`});
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Algum erro ocorreu ao tentar apagar todos os times."
            });
        });
};

exports.findAll_international_champion = (req, res) => {
    Team.findAll({ where: { international_champion: true } })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Algum erro ocorreu ao tentar pesquisar todos os campeões internacionais."
        });
    });
};