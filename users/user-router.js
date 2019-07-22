const express = require("express");

const Users = require("./user-model");

const router = express.Router();

//get all users
router.get("/", (req, res) => {
  Users.find()
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(500).json({ message: "There was an error retrieving users" });
    });
});

module.exports = router;
