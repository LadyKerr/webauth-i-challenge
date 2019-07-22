const express = require("express");
const bcrypt = require("bcryptjs");

const Users = require("./user-model");
const auth = require("../auth/auth");

const router = express.Router();

//initial message
router.get("/", (req, res) => {
  res.send("Server is running. Start coding!");
});

//get all users; use middleware
router.get("/api/users", auth, (req, res) => {
  Users.find()
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "There was an error retrieving users" });
    });
});

//register new user & hash password
router.post("/api/register", (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 12);
  user.password = hash;

  Users.add(user)
    .then(newUser => {
      res.status(201).json(newUser);
    })
    .catch(err => {
      res.status(500).json({ message: "You shall not pass. " });
    });
});

//user can now login
router.post("/api/login", (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      //verifying password
      if (user && bcrypt.compareSync(password, user.password)) {
        res.status(200).json({ message: `Nice to see you ${user.username}!` });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    })
    .catch(err => {
      req.status(500).json({ message: "There was an error" });
    });
});

module.exports = router;
