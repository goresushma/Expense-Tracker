const express = require("express");
const expenseRouter = express.Router();

const auth = require("../middlewares/authMiddlewares");
const expenseController = require("../controllers/expenseController");

expenseRouter.post("/add", auth, expenseController.addExpenses);
expenseRouter.get("/all", auth, expenseController.getExpense);
expenseRouter.put("/update/:id", auth, expenseController.updateExpense);
expenseRouter.delete("/delete/:id", auth, expenseController.deleteExpense);

module.exports = expenseRouter;
