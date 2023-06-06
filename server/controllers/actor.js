const Actor = require("../models/actor");

const createActor = async (req, res) => {
   res.send({ actor: req.body });
};

module.exports = { createActor };
