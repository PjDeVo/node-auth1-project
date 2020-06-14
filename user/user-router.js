const router = require("express").Router();
const restricted = require("../auth/restriced.js");

const Users = require("../auth/users-model.js");

router.get("/", restricted, (req, res) => {
  Users.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      res.send(error);
    });
});

module.exports = router;
