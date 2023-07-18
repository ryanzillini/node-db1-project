const Account = require("./accounts-model");

exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  // Note: you can either write "manual" validation logic
  // or use the Yup library (not currently installed)
  const { name, budget } = req.body;
  if (!name.trim() || !budget.trim()) {
    res.status(400).json({ message: "name and budget are required" });
  } else if (name.trim().length > 100 || name.trim().length < 3) {
    res
      .status(400)
      .json({ message: "name of accounts must be between 3 and 100" });
  } else if (parseFloat(budget) === undefined) {
    res.status(400).json({ message: "budget of account must be a number" });
  } else if (parseFloat(budget) < 0 || parseFloat(budget) > 1000000) {
    res
      .status(400)
      .json({ message: "budget of account is too large or too small" });
  } else next();
};

exports.checkAccountNameUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  const { name } = req.body;
  const accountNames = await Account.getByName(name);
  if (accountNames.length > 0) {
    res.status(400).json({ message: "that name is taken" });
  } else next();
};

exports.checkAccountId = (req, res, next) => {
  // DO YOUR MAGIC
  const { id } = req.params;
  if (!id || id === undefined) {
    res.status(400).json({ message: "account not found" });
  }
  next();
};
