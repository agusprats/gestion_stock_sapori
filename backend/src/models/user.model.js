const { randomUUID } = require("crypto");

const createUser = ({ email, password }) => ({
  id: randomUUID(),
  email: email.toLowerCase(),
  password,
  createAt: new Date().toISOString(),
});

module.exports = { createUser };