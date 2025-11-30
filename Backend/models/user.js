const db = require("../config/db");

const createUserTable = async () => {
  await db.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INT  AUTO_INCREMENT PRIMARY KEY,
      user VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  console.log("users table created");
};

createUserTable();

module.exports = {
  create: async (user, email, hashedPassword) => {
    const [result] = await db.query(
      "INSERT INTO users(user, email, password) VALUES(?,?,?)",
      [user, email, hashedPassword]
    );
    return result;
  },

  findByEmail: async (email) => {
    const [rows] = await db.query("SELECT * FROM users WHERE email= ?", [
      email,
    ]);
    return rows[0];
  },
};
