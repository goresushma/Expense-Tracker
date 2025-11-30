//External Moduels
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

//local module
const db = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const auth = require("./middlewares/authMiddlewares");
const expenseRoutes = require("./routes/expenseRoutes");

const app = express();

//middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true })); //parse incoming data
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/expense", expenseRoutes);

app.get("/profile", auth, (req, res, next) => {
  res.json({
    message: "Profile Access Granted",
    user: req.user,
  });
});

db.query("SELECT 1")
  .then(() => console.log("database connected succesfully"))
  .catch((err) => console.log(err));

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on Port http://localhost:${port}`);
});
