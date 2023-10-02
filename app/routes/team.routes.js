module.exports = app => {
    const teams = require("../controllers/team.controller");

    var router = require("express").Router();

    router.post("/", teams.create);

    router.get("/", teams.findAll);

    router.get("/international_champion", teams.findAll_international_champion);

    router.get("/:id", teams.findOne);

    router.put("/:id", teams.update);

    router.delete("/:id", teams.delete);

    router.delete("/", teams.deleteAll);

    app.use('/api/teams', router);
};