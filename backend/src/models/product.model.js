const { randomUUID } = require("crypto");

const createProduct = ({ name, description, category, price, stock }) => ({
  id: randomUUID(),
  name,
  description,
  category: category ? String(category).toLowerCase() : "otros",
  price,
  stock,
  createAt: new Date().toISOString(),
});

module.exports = { createProduct };