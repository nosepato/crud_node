const db = require("../models");
const League = db.leagues;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.name) {
        res.status(400).send({
            message: "Conteúdo não pode ser vazio!"
        });
        return;
    }

    const league = {
        name: req.body.name,
        country: req.body.country,
        quantity_teams: req.body.quantity_teams,
        league_value: req.body.league_value,
        is_top5: req.body.is_top5 ? req.body.is_top5: false
    }

    League.create(league)
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Algo deu errado na criação da liga."
        })
    })
};


exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.iLike]: `%${name}%`} } :null;

    console.log(req);

    League.findAll({where: condition})
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Algo deu errado ao tentar pesquisar as ligas."
        })
    })
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    League.findByPk(id)
        .then(data => {
            if (data){
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Não foi possível encontrar uma liga com o id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Ocorreu um erro ao tentar encontrar uma liga com o id=" + id
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    League.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "A liga foi atualizada com sucesso."
                });
            } else {
                res.send({
                    message: `Não foi possível atualizar a liga com o id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Ocorreu um erro ao tentar atualizar uma liga como o id=" + id
            });
        });   
};

exports.delete = (req, res) => {
    const id = req.params.id;

    League.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "A liga foi apagado com sucesso!"
                });
            } else {
                res.send({
                    message: `Não foi possível apagar a liga com o id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Ocorreu um erro ao tentar apagar a liga com o id=" + id
            });
        });
};

exports.deleteAll = (req, res) => {
    League.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({message: `${nums} As ligas foram apagadas com sucesso.`});
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Algum erro ocorreu ao tentar apagar todas as ligas."
            });
        });
};

exports.findAllis_top5 = (req, res) => {
    League.findAll({ where: { is_top5: true } })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Algum erro ocorreu ao tentar pesquisar todas as ligas do Top5."
        });
    });
};