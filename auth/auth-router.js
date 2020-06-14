const router = require("express").Router();
const Users = require("./users-model");
const bcrypt = require("bcryptjs");

router.post("/register", async (req, res) => {
  const user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  try {
    const newUser = await Users.add(user);
    res.status(201).json(newUser);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMessage: "can not connect to database" });
  }
});

router.post("/login", async (req, res) => {
  let { username, password } = req.body;

  try {
    const user = await Users.findBy({ username }).first();
    if (user && bcrypt.compareSync(password, user.password)) {
      req.session.user = user;
      res.status(200).json({ message: `welcome ${username}` });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({ errorMessage: "Error Accessing DB" });
  }
});

module.exports = router;
