const db = require("../../data/db-config");

const getAll = () => {
  // DO YOUR MAGIC
  return db("accounts");
};

const getById = (id) => {
  // DO YOUR MAGIC
  return db("accounts").where({ id }).first();
};

const create = (account) => {
  // DO YOUR MAGIC
  return db("accounts")
    .insert(account)
    .then((id) => {
      console.log(account);
      return getById(id);
    });
};

const updateById = (id, account) => {
  // DO YOUR MAGIC
  return db("accounts").where({ id }).update(account);
};

const deleteById = (id) => {
  // DO YOUR MAGIC
  return db("accounts").where({ id }).delete();
};

const getByName = async (name) => {
  const result = await db("accounts").where("name", name);
  return result;
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
  getByName,
};
