const Expense = require("../models/expense");

//add expenses with user
exports.addExpenses = async (req, res, next) => {
  try {
    const { amount, category, description } = req.body;
    const user_id = req.user.id;

    if (!amount || !category) {
      return res
        .status(400)
        .json({ message: "Amount and Category are necessary!" });
    }

    await Expense.create(user_id, amount, category, description);
    res.status(201).json({ message: "Expenses added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

//get expenses with user_id
exports.getExpense = async (req, res, next) => {
  try {
    const user_id = req.user.id;

    const [rows] = await Expense.getAll(user_id);

    res.status(200).json({ message: "Successfully Fetch", expenses: rows });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

//update the expenses
exports.updateExpense = async (req, res, next) => {
  try {
    const user_id = req.user.id;
    const { amount, category, description } = req.body;
    const { id } = req.params;

    if (!amount || !category) {
      return res
        .status(400)
        .json({ message: "Amount and Category are necessary!" });
    }

    const [result] = await Expense.update(
      id,
      user_id,
      amount,
      category,
      description
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Expense cannot found" });
    }

    res.status(200).json({ message: "Updated Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

//delete the expense
exports.deleteExpense = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { id } = req.params;

    const [result] = await Expense.delete(id, user_id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Expense can't delete" });
    }

    res.status(200).json({ message: "Deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};
