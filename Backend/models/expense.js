const db = require("../config/db");

const createExpenseTable = async () => {
  //console.log("inside create db");
  await db.query(`
    
    CREATE TABLE IF NOT EXISTS expenses(
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      amount DECIMAL (10, 2) NOT NULL,
      category VARCHAR(50) NOT NULL,
      description TEXT,
      date DATE DEFAULT (CURRENT_DATE),
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);
};

createExpenseTable();

//insert expenses
exports.create = (user_id, amount, category, description) => {
  return db.query(
    "INSERT INTO expenses (user_id, amount, category, description)  VALUES(?, ?, ?,?)",
    [user_id, amount, category, description]
  );
};

//after login
exports.getAll = (user_id) => {
  return db.query("SELECT * FROM expenses WHERE  user_id =?", [user_id]);
};

//update expense
exports.update = (id, user_id, amount, category, description) => {
  return db.query(
    "UPDATE expenses SET amount=?, category=?, description=? WHERE id=? AND user_id=?",
    [amount, category, description, id, user_id]
  );
};

//delete expense
exports.delete = (id, user_id) => {
  return db.query("DELETE FROM expenses WHERE id=? AND user_id=?", [
    id,
    user_id,
  ]);
};
