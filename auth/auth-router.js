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

module.exports = router;
