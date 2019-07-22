const bcrypt = require("bcryptjs");

const Users = require("../users/user-model");

//custom middleware to validate user on /api/users
function auth(req, res, next) {
  const { username, password } = req.headers;

  //find users in db
  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        next();
      } else {
        res.status(401).json({ message: "You shall not pass." });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "You shall not pass." });
    });
}

module.exports = auth;
