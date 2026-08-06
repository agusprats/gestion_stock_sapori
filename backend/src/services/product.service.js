const { readDB, writeDB } = require("../utils/db");
const { createProduct } = require("../models/product.model");

const normalizeString = (value) =>
  typeof value === "string" ? value.toLowerCase() : value;

const normalizeId = (id) => (typeof id === "string" ? id.toLowerCase() : id);

const getAll = (query = {}) => {
  const db = readDB("products.json");
  let products = db.products;

  if (query.category) {
    const category = normalizeString(query.category);
    products = products.filter(
      (product) => normalizeString(product.category) === category
    );
  }

  if (query.q) {
    const search = query.q.toLowerCase();
    products = products.filter(
      (product) =>
        normalizeString(product.name).includes(search) ||
        normalizeString(product.description).includes(search)
    );
  }

  return products;
};

const getById = (id) => {
  const db = readDB("products.json");
  const normalizedId = normalizeId(id);

  const product = db.products.find(
    (product) => normalizeId(product.id) === normalizedId
  );

  if (!product) {
    const error = new Error("Producto no encontrado");
    error.status = 404;
    throw error;
  }

  return product;
};

const create = (fields) => {
  const db = readDB("products.json");

  const newProduct = createProduct(fields);

  db.products.push(newProduct);

  writeDB("products.json", db);

  return newProduct;
};

const update = (id, fields) => {
  const db = readDB("products.json");
  const normalizedId = normalizeId(id);

  const index = db.products.findIndex(
    (product) => normalizeId(product.id) === normalizedId
  );

  if (index === -1) {
    const error = new Error("Producto no encontrado");
    error.status = 404;
    throw error;
  }

  const updatedFields = { ...fields };
  if (updatedFields.category) {
    updatedFields.category = normalizeString(updatedFields.category);
  }

  db.products[index] = {
    ...db.products[index],
    ...updatedFields,
    id: db.products[index].id,
  };

  writeDB("products.json", db);

  return db.products[index];
};

const remove = (id) => {
  const db = readDB("products.json");
  const normalizedId = normalizeId(id);

  const index = db.products.findIndex(
    (product) => normalizeId(product.id) === normalizedId
  );

  if (index === -1) {
    const error = new Error("Producto no encontrado");
    error.status = 404;
    throw error;
  }

  db.products.splice(index, 1);
  writeDB("products.json", db);
};

module.exports = { getAll, getById, create, update, remove };