module.exports = app => {  
    const leagues = require("../controllers/league.controller")

    var router = require("express").Router();

    router.post("/", leagues.create);

    router.get("/", leagues.findAll);

    router.get("/is_top5", leagues.findAllis_top5);

    router.get("/:id", leagues.findOne);

    router.put("/:id", leagues.update);

    router.delete("/:id", leagues.delete);

    router.delete("/", leagues.deleteAll);

    app.use('/api/leagues', router);
};