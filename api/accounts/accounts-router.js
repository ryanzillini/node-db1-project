const express = require("express");
const router = express.Router();

const Account = require("./accounts-model");

const {
  checkAccountPayload,
  checkAccountNameUnique,
  checkAccountId,
} = require("./accounts-middleware");

router.get("/", (req, res, next) => {
  // DO YOUR MAGIC
  Account.getAll()
    .then((acc) => {
      res.json(acc);
    })

    .catch(next);
});

router.get("/:id", checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  Account.getById(req.params.id)
    .then((acc) => {
      res.json(acc);
    })
    .catch(next);
});

router.post(
  "/",
  checkAccountPayload,
  checkAccountNameUnique,
  (req, res, next) => {
    // DO YOUR MAGIC
    Account.create({ name: req.name, budget: req.budget })
      .then((account) => {
        res.status(201).json(account);
      })
      .catch(next);
  }
);

router.put(
  "/:id",
  checkAccountPayload,
  checkAccountId,
  checkAccountNameUnique,
  async (req, res, next) => {
    // DO YOUR MAGIC
    try {
      const updatedPost = await Account.updateById(req.params.id, {
        name: req.body.name,
        budget: req.body.budget,
      }).then(() => {
        return Account.getById(req.params.id);
      });
      res.json(updatedPost);
    } catch (err) {
      next(err);
    }
  }
);

router.delete("/:id", checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  Account.deleteById(req.params.id)
    .then((deleted) => {
      res.json(deleted);
    })
    .catch(next);
});

module.exports = router;
