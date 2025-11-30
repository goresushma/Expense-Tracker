const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res, next) => {
  try {
    //get all required fields
    const { name, email, password } = req.body;

    //check user enters all required fields
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@&%$?!])[A-Za-z\d@&%$?!]{8,}$/;

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "password required atleast 8 characters including 1 capital letter, 1 small letter, 1 special symbol, 1 number",
      });
    }

    //validate
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "Email Already Exits" });
    }

    //password hash
    const hashpassword = await bcrypt.hash(password, 10);

    //save
    await User.create(name, email, hashpassword);
    res.status(201).json({ message: "User Registred Successfully" });
  } catch (error) {
    console.error();
    res.status(500).json({ message: "Server error" });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    //search for user in db
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    //compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Password" });
    }

    //create jwt token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Loggin Successfull",
      token: token,
    });
  } catch (error) {
    console.error();
    res.status(500).json({ message: "Server error" });
  }
};
