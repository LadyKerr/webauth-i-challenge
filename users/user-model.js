const db = require("../data/db-config");

module.exports = {
  find,
  findById,
  add,
  update,
  remove
};

//find all users
function find() {
  return db("users");
}

//find users by their id
function findById(id) {
  return db("users")
    .where({ id })
    .first()
    .then(user => {
      if (user) {
        return user;
      } else {
        return null;
      }
    });
}

//add new user
function add(user) {
  return db("users")
    .insert(user)
    .then(id => {
      return findById(id[0]);
    });
}

//update user
function update(changes, id) {
  return db("users")
    .where({ id })
    .update(changes);

  //delete user
  function remove(id) {
    return db("users")
      .where({ id })
      .del();
  }
}
