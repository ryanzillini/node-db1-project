const Account = require("./accounts-model");

exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  // Note: you can either write "manual" validation logic
  // or use the Yup library (not currently installed)
  const { name, budget } = req.body;
  if (!name || budget === undefined) {
    res.status(400).json({ message: "name and budget are required" });
  } else if (name.trim().length > 100 || name.trim().length < 3) {
    res
      .status(400)
      .json({ message: "name of accounts must be between 3 and 100" });
  } else if (typeof budget !== "number" || isNaN(budget)) {
    res.status(400).json({ message: "must be a number" });
  } else if (budget < 0 || budget > 1000000) {
    res
      .status(400)
      .json({ message: "budget of account is too large or too small" });
  } else {
    req.name = name.trim();
    req.budget = budget;
    next();
  }
};

exports.checkAccountNameUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  const { name } = req.body;
  const accountNames = await Account.getByName(name);
  if (accountNames.length > 0) {
    res.status(400).json({ message: "that name is taken" });
  } else next();
};

exports.checkAccountId = async (req, res, next) => {
  // DO YOUR MAGIC
  const { id } = req.params;
  const accountId = await Account.getById(id);
  if (!accountId) {
    res.status(404).json({ message: "account not found" });
  } else next();
};
